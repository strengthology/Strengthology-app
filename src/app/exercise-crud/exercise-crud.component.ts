import { Component, OnInit } from '@angular/core';
import { Exercise } from '../models/exercise';

@Component({
  selector: 'app-exercise-crud',
  templateUrl: './exercise-crud.component.html',
  styleUrls: ['./exercise-crud.component.scss'],
})
export class ExerciseCrudComponent implements OnInit {

  exercise: Exercise = {id: null, exerciseName: '', exerciseCategory: null, exerciseType: null};

  constructor() { }

  ngOnInit() {}

}
