import { Component, OnInit } from '@angular/core';
import { Exercise } from '../models/exercise';
import { DatabaseService } from '../database/database.service';
import { ToastController } from '@ionic/angular';


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
    public toastController: ToastController
  ) { }

  ngOnInit() {}

  saveExercise() {
    this.dbService.insertIntoExercise(this.exercise).then((res: Boolean) => {
      if (res) {
        this.presentToastWithOptions().then(() => {
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

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Exercise Saved',
      // message: 'Click to Close',
      position: 'top',
      color: 'success',
      buttons: [
        // {
          // side: 'start',
          // icon: 'star',
          // text: 'Favorite',
          // handler: () => {
          //   console.log('Favorite clicked');
          // }
        // }, 
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
