import { Component, OnInit, AfterViewChecked } from '@angular/core';

import { Session } from '../models/sessions';
import { Set } from '../models/set';
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

  public async getSessions() {
    await this.dbService.selectFromTable(`*`, `sessions`).then(async (res) => {
      if (res) {
        this.sessionList = res as Session[];
        await this.getSetData();
        this.sortSessions();
      }
    }).catch((e) => {
      console.log(e);
    });
  }

  public async getSetData() {
    await Promise.all(this.sessionList.map(async (item: Session) => {
          await this.dbService.getAllSetsBySession(item.id).then((res) => {
            item.sets = res as Set[];
          });
    }));
  }

  sortSessions() {
    try {
      this.sessionList = this.sessionList.sort((a, b) => (a.date > b.date) ? 1 : -1);
      console.log(this.sessionList);
    } catch (e) {
      console.log(e);
    }
  }
}
