import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { DatabaseService } from './database/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Exercises',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dbService: DatabaseService,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready().then(async () => {
      await this.dbService.initDatabase().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    });
  }
}
