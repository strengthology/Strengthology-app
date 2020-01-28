import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  public database: SQLiteObject;

  private createTableSql: string;

  constructor(
    public sqlite: SQLite,
    private http: HttpClient,
  ) { }

  public async initDatabase() {

      await this.sqlite.create({name: "data.db", location: "default"}).then((db : SQLiteObject) => {
                    this.database = db;
                }, (error) => {
                    console.log("ERROR: ", error);
      });

      this.createTable();

  }

  public async createTable(){
    await this.http.get('../../assets/sql/exampleTable.sql', {responseType: 'text'})
            .toPromise().then((data) => {
              // console.log(data);
              this.createTableSql = data;
          })
          .catch((e) => {console.log(e)});

    this.database.executeSql(this.createTableSql, [])
        .then(() => {
            console.log('Example Table created !');

        })
        .catch((e) => console.log(e));    
  }
}
