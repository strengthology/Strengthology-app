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
  selectType: Boolean = false;
  reverseName: Boolean = false;
  selectName: Boolean = false;
  reverseCategory: Boolean = false;
  selectCategory: Boolean = false;

  searchValue: string = '';

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
  public list: Array<Exercise>;
  constructor(
    public dbService: DatabaseService,
  ) { }
  

  ngOnInit() {
    this.dbService.getAllExercises();
    this.dbService.getAllSetsBySession(1).then((res) => {
      console.log(res);
    });

  }
  /*
  public getExercises() {
    this.dbService.selectFromTable(`*`, `exercises`).then((res) => {
      console.log(res);
      this.exerciseList = res as Array<Exercise>;
      this.list = this.exerciseList;
      this.listByName();
    }).catch((e) => {
      console.log(e);
    })
  }
  */
  searchExercises() {
    // console.log(`%c Searching...`, 'color: green');
    try {
      if (this.selectName) {
        this.exerciseList = this.list.filter((item) => { return item.exerciseName.toLowerCase().includes(this.searchValue.toLowerCase())});
      } else if (this.selectType) {
        this.exerciseList = this.list.filter((item) => { return item.exerciseType.toLowerCase().includes(this.searchValue.toLowerCase())});
      } else {
        this.exerciseList = this.list.filter((item) => { return item.exerciseCategory.toLowerCase().includes(this.searchValue.toLowerCase())});
      }
    } catch (e) {
      console.log(e);
    }
  }

  listByName() {
    try {
      this.selectName = true;
      this.selectCategory = false;
      this.selectType = false;
      // console.log(`%c By Name`, 'color: green; font-weight: bold');
      if (!this.reverseName) {
        this.exerciseList.sort((a, b) => (a.exerciseName > b.exerciseName) ? 1 : -1);
        this.reverseName = true;
      } else {
        this.exerciseList.sort((a, b) => (a.exerciseName < b.exerciseName) ? 1 : -1);
        this.reverseName = false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  listByType() {
    try {
      this.selectName = false;
      this.selectCategory = false;
      this.selectType = true;
      // console.log(`%c By Type`, 'color: yellow; font-weight: bold');
      if (!this.reverseType) {
        this.exerciseList.sort((a, b) => (a.exerciseType > b.exerciseType) ? 1 : -1);
        this.reverseType = true;
      } else {
        this.exerciseList.sort((a, b) => (a.exerciseType < b.exerciseType) ? 1 : -1);
        this.reverseType = false;
      }
    } catch (e) {
      console.log(e);
    }
  }

  listByCategory() {
    try {
      this.selectName = false;
      this.selectCategory = true;
      this.selectType = false;
      // console.log(`%c By Category`, 'color: red; font-weight: bold');
      if (!this.reverseCategory) {
        this.exerciseList.sort((a, b) => (a.exerciseCategory > b.exerciseCategory) ? 1 : -1);
        this.reverseCategory = true;
      } else {
        this.exerciseList.sort((a, b) => (a.exerciseCategory < b.exerciseCategory) ? 1 : -1);
        this.reverseCategory = false;
      }
    } catch (e) {
      console.log(e);
    }
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
