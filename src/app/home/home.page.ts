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
  } 

  ngAfterViewInit () {
  }

}