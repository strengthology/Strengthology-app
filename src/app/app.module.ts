import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SQLite  , SQLiteDatabaseConfig , SQLiteObject } from '@ionic-native/sqlite/ngx';


declare var SQL;
export class SQLiteMock {
  public create(config: SQLiteDatabaseConfig): Promise<SQLiteObject> {
    //since this is an in memory database we can ignore the config parameters 
    var db = new SQL.Database();

    return new Promise((resolve,reject)=>{
      resolve(new SQLiteObject(db));
    });
  }
} 
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // SQLite,
    {provide: SQLite, useClass: SQLiteMock},

  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
