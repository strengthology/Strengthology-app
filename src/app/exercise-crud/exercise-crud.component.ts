import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Exercise } from '../models/exercise';
import { DatabaseService } from '../database/database.service';
import { AlertService } from '../notifications/alert.service';


@Component({
  selector: 'app-exercise-crud',
  templateUrl: './exercise-crud.component.html',
  styleUrls: ['./exercise-crud.component.scss'],
})
export class ExerciseCrudComponent implements OnInit {

  exercise: Exercise = {id: null, exerciseName: '', exerciseCategory: null, exerciseType: null};

  blankExercise: Exercise = {id: null, exerciseName: '', exerciseCategory: null, exerciseType: null};

  typeOptions: Array<string> = ['Strength', 'Conditioning', 'Cardio', 'Other'];

  categoryOptions: Array<string> = ['Powerlifting', 'Olympic Lifting', 'Strongman', 'Other'];

  constructor(
    public dbService: DatabaseService,
    public alertService: AlertService,
  ) { }

  ngOnInit() {
  }

  saveExercise() {
    this.dbService.insertIntoExercise(this.exercise).then((res: Boolean) => {
      if (res) {
        this.alertService.basicAlert('Exercise Saved', 'success').then(() => {
          this.exercise = this.blankExercise;
        });
      } else {
        this.alertService.basicAlert('Exercise Not Saved!', 'danger').then(() => {
          this.exercise = this.blankExercise;
        });
      }
    });
  }

  isValid(): Boolean {
    if (this.exercise.exerciseName.length > 2 && this.exercise.exerciseCategory && this.exercise.exerciseType) {
      return true;
    } else {
      return false;
    }
  }

  
}
