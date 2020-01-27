import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  public database: SQLiteObject;
  public invoices: Array<Object>; // our data  
  public counter : number = 0;

  constructor(private sqlite : SQLite) { }
  ngOnInit() {
    try {
      this.sqlite.create({name: "data.db", location: "default"}).then((db : SQLiteObject) => {
                    this.database = db;
                }, (error) => {
                    console.log("ERROR: ", error);
     });
    } catch (e) {
      console.log(e);
    }
  } 
}