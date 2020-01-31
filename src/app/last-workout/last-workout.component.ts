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

  sessionList: Session[];

  constructor(
    public dbService: DatabaseService,
  ) { }

  ngOnInit() {
    this.dbService.getDatabaseState().subscribe((res) => {
      console.log(`%c Database Ready?: ${res}`, 'color: green; font-weight: bold');
      if (res) {
        console.log(`%c Getting Stored Sessions`, 'color: green; font-weight: bold');
        this.getSessions();
      }
    });
  }

  public async getSessions() {
    await this.dbService.selectFromTable(`*`, `sessions`).then(async (res) => {
      if (res) {
        console.log(`%c Accessed Sessions`, 'color: green; font-weight: bold');
        this.sessionList = res as Session[];
        await this.getSetData();
        this.sortSessions();
      }
    });
    // .catch((e) => {
    //   console.log(e);
    // });
  }

  public async getSetData() {
    await Promise.all(this.sessionList.map(async (item: Session) => {
      console.log(`%c Compiling Set Data`, 'color: green; font-weight: bold');
          await this.dbService.getAllSetsBySession(item.id).then((res: Set[]) => {
            console.log(`%c Retrieved Set Data`, 'color: green; font-weight: bold');
            console.log(res);
            if (res) {
              res = res.sort((a, b) => (a.exercise.exerciseName > b.exercise.exerciseName) ? 1 : -1)
              item.sets = res as Set[];
            }
          })
          // .catch((e) => {
          //   console.log(e);
          // });
    }));
  }

  public sortSessions() {
    try {
      this.sessionList = this.sessionList.sort((a, b) => (a.date < b.date) ? 1 : -1);
      console.log(this.sessionList);
    } catch (e) {
      console.log(e);
    }
  }

  public sessionVolume(): number {
    let volume = 0;
    try {
    this.sessionList[0].sets.forEach((set) => {
      volume += (set.reps * set.weight);
    });
    } catch (e) {
      console.log(e);
    }
    return volume;
  }

  public sessionReps(): number {
    let reps = 0;
    try {
      this.sessionList[0].sets.forEach((set) => {
        reps += parseInt(set.reps.toString());
      });
    } catch (e) {
      console.log(e);
    }
    return reps;
  }
}
