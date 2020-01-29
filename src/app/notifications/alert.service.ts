import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public toastController: ToastController,
  ) { }

  // async presentToastWithOptions() {
  //   const toast = await this.toastController.create({
  //     header: 'Exercise Saved',
  //     // message: 'Click to Close',
  //     position: 'top',
  //     color: 'success',
  //     buttons: [
  //       // {
  //         // side: 'start',
  //         // icon: 'star',
  //         // text: 'Favorite',
  //         // handler: () => {
  //         //   console.log('Favorite clicked');
  //         // }
  //       // }, 
  //       {
  //         text: 'Done',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   toast.present();
  // }

  async basicAlert(header: string, colorOption: string) {
    const toast = await this.toastController.create({
      header: header,
      position: 'top',
      color: colorOption,
      buttons: [
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
