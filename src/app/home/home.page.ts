import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { Exercise } from '../models/exercise';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit {
  public exerciseList: Array<Exercise>;
  constructor(
    public dbService: DatabaseService,
  ) { }

  ngOnInit() {
    this.dbService.initDatabase().then(() => {
      this.getExercises();
    })
  } 

  ngAfterViewInit () {
  }

  getExercises() {
    this.dbService.selectFromTable(`*`, `exercises`).then((res) => {
      this.exerciseList = res as Array<Exercise>;
      console.log(this.exerciseList);
    }).catch((e) => {
      console.log(e);
    })
  }
}