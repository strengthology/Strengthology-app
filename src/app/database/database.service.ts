import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Exercise } from '../models/exercise';
import { Session } from '../models/sessions';
import { Set } from '../models/set';
import { BehaviorSubject, Observable } from 'rxjs';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  // flag used to delay dbService calls until after db is ready
  public databaseState: BehaviorSubject<Boolean>;
  public database: SQLiteObject;

  private sourceTables = ['assets/sql/setsTable.sql', 'assets/sql/sessionsTable.sql'];
  private dummyData =  ['assets/sql/dummyDataSessions.sql', 'assets/sql/dummyDataSets.sql'];

  constructor(
    public sqlite: SQLite,
    private http: HttpClient,
    public storage: Storage,
    public sqlitePorter: SQLitePorter
  ) { 
    this.databaseState = new BehaviorSubject<boolean>(false);
  }

  public async initDatabase() {
    // initial create block is used to create database and create+insert data into exercises table
     await this.sqlite.create({name: "data.db", location: "default"}).then(async (db : SQLiteObject) => {
              this.database = db;
              await this.storage.get('database_filled').then(val => {
                // if (!val) {
                  this.fillDatabase();
                // }
              });
            }, (error) => {
              console.log("ERROR: ", error);
      })
      .then(async () => {
        // creates tables
        await Promise.all(this.sourceTables.map(async (source) => {      
          await this.createTable(source);
        }));
      }).then(async () => {
        // inserts dummy data into table
        // dev only
        await Promise.all(this.dummyData.map(async (source) => {
          await this.createTable(source);
        }));
        this.setDatabaseState(true); 
      });
  }

  public getDatabaseState(): Observable<Boolean> {
    return this.databaseState.asObservable();
  }

  public setDatabaseState(boolean: Boolean): void {
    this.databaseState.next(boolean);
  }

  public async fillDatabase() {
    await this.http.get('assets/sql/exerciseTable.sql', {responseType: 'text'}).toPromise().then(async (res: string) => {
      const sqlArray = res.split(';');
      console.log(`%c Creating Exercises`, 'color: blue; font-weight: bold');
      await Promise.all(sqlArray.map(async (sql) => {
        await this.database.executeSql(sql, [])
        .catch((e) => console.log(e)); 
        }));
      }).then(() => {
        this.storage.set('database_filled', true); 
      });
     
  }

  public async createTable(source: string){
    await this.http.get(source, {responseType: 'text'})
            .toPromise().then((sql: string) => {
              // console.log(data);
              this.database.executeSql(sql, [])
              .then(() => {
                  console.log(`${source} accessed`);  
              })
              .catch((e) => console.log(e));    
        });
  }

  public selectFromTable(sVal: string, table: string): Promise<any> {
    return this.database.executeSql(`select ${sVal} from ${table}`, [])
    .then((res )=> {
      const row_data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          row_data.push(res.rows.item(i));
        }
      }
      return row_data;
    }).catch((e) => {
      console.log(e);
    })
  }

  public selectFromTableWhere(sVal: string, table: string, column: string, value: string): Promise<any> {
    return this.database.executeSql(`select ${sVal} from ${table} where ${column} = ${value}`, [])
    .then((res )=> {
      const row_data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          row_data.push(res.rows.item(i));
        }
      }
      return row_data;
    }).catch((e) => {
      console.log(e);
    })
  }

  public async insertIntoExercise(exercise: Exercise): Promise<Boolean> {
    let status = null;
    await this.database.
      executeSql(`insert into exercises (exerciseName, exerciseType, exerciseCategory) 
      values ('${exercise.exerciseName}', '${exercise.exerciseType}', '${exercise.exerciseCategory}');`)
      .then((res) => {
        status = true;
      })
      .catch((e) => {
        console.log(e);
        status = false;
      });
    return status;
  }

  public async getAllSetsBySession(id: number) {
    return this.database.executeSql(`select * from sets where sessionId = ${id}`).then(async (res) => {
      const row_data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          console.log(res.rows.item(i).exercise);
          res.rows.item(i).exercise = JSON.parse(res.rows.item(i).exercise);
          row_data.push(res.rows.item(i));
        }
      }
      return row_data;
    }).catch((e) => {
      console.log(e);
    })
  }
}
