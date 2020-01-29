import { Component, OnInit } from '@angular/core';
import { Exercise } from '../models/exercise';
import { DatabaseService } from '../database/database.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  reverseType: Boolean = false;
  reverseName: Boolean = false;
  reverseCategory: Boolean = false;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  
  public exerciseList: Array<Exercise>;
  constructor(
    public dbService: DatabaseService,
  ) { }
  

  ngOnInit() {
    this.getExercises();
  }

  public getExercises() {
    this.dbService.selectFromTable(`*`, `exercises`).then((res) => {
      this.exerciseList = res as Array<Exercise>;
      this.listByName();
    }).catch((e) => {
      console.log(e);
    })
  }

  listByName() {
    console.log(`%c By Name`, 'color: green; font-weight: bold');
    if (!this.reverseName) {
      this.exerciseList.sort((a, b) => (a.exerciseName > b.exerciseName) ? 1 : -1);
      this.reverseName = true;
    } else {
      this.exerciseList.sort((a, b) => (a.exerciseName < b.exerciseName) ? 1 : -1);
      this.reverseName = false;
    }
  }

  listByType() {
    console.log(`%c By Type`, 'color: yellow; font-weight: bold');
    if (!this.reverseType) {
      this.exerciseList.sort((a, b) => (a.exerciseType > b.exerciseType) ? 1 : -1);
      this.reverseType = true;
    } else {
      this.exerciseList.sort((a, b) => (a.exerciseType < b.exerciseType) ? 1 : -1);
      this.reverseType = false;
    }
  }

  listByCategory() {
    console.log(`%c By Category`, 'color: red; font-weight: bold');
    if (!this.reverseCategory) {
      this.exerciseList.sort((a, b) => (a.exerciseCategory > b.exerciseCategory) ? 1 : -1);
      this.reverseCategory = true;
    } else {
      this.exerciseList.sort((a, b) => (a.exerciseCategory < b.exerciseCategory) ? 1 : -1);
      this.reverseCategory = false;
    }
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
