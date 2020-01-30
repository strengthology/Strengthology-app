import { Component, OnInit, AfterViewChecked } from '@angular/core';

import { Session } from '../models/sessions';
import { DatabaseService } from '../database/database.service';

@Component({
  selector: 'app-last-workout',
  templateUrl: './last-workout.component.html',
  styleUrls: ['./last-workout.component.scss'],
})
export class LastWorkoutComponent implements OnInit {

  sessionList: Session[] = [];

  constructor(
    public dbService: DatabaseService,
  ) { }

  ngOnInit() {
    this.dbService.getDatabaseState().subscribe((res) => {
      if (res) {
        this.getSessions();
      }
    });
  }

  getSessions() {
    this.dbService.selectFromTable(`*`, `sessions`).then((res) => {
      if (res) {
        this.sessionList = res as Session[];
        this.sessionList.forEach((item: Session) => {
          console.log(item.date);
        });
        this.sortSessions();
      }
    }).catch((e) => {
      console.log(e);
    });
  }

  sortSessions() {
    try {
      this.sessionList = this.sessionList.sort((a, b) => (a.date > b.date) ? 1 : -1);
    } catch (e) {
      console.log(e);
    }
  }
}
