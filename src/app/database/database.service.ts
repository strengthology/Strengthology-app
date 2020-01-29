import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  public database: SQLiteObject;

  private sourceTables = ['assets/sql/exampleTable.sql'];

  constructor(
    public sqlite: SQLite,
    private http: HttpClient,
    public storage: Storage,
    public sqlitePorter: SQLitePorter
  ) { }

  public async initDatabase() {

      await this.sqlite.create({name: "data.db", location: "default"}).then(async (db : SQLiteObject) => {
              this.database = db;
              await this.storage.get('database_filled').then(val => {
                if (!val) {
                  this.fillDatabase();
                }
              });
            }, (error) => {
              console.log("ERROR: ", error);
      });

      await Promise.all(this.sourceTables.map(async (source) => {      
        this.createTable(source);
      }));
  }

  public fillDatabase() {
    this.http.get('assets/sql/exerciseTable.sql', {responseType: 'text'}).toPromise().then((sql: string) => {
      this.database.executeSql(sql, [])
      .then(() => {
          this.storage.set('database_filled', true);
          this.database.executeSql(`select * from exercises`).then(x => {
            console.log(x);
          })
      })
      .catch((e) => console.log(e)); 
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
}
