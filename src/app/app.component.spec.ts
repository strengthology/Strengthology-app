import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

import { HttpClient, HttpHandler } from '@angular/common/http';

import { DatabaseService } from './database/database.service';
import { Storage } from '@ionic/storage';


describe('AppComponent', () => {
    let dbService: DatabaseService;
    let sqLite: any;
    let httpClient: HttpClient;
    let httpHandler: HttpHandler;
    let storage: Storage;
    let sqlitePorter: SQLitePorter;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [AppComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
            Platform,
            StatusBar,
            SplashScreen,
            {provide: SQLite, use: {}},
            HttpClient,
            {provide: HttpHandler, use: {} },
            {provide: Storage, use: {}},
            {provide: SQLitePorter, use: {}}
        ],
        imports: [ RouterTestingModule.withRoutes([])],
        }).compileComponents();
    }));

    beforeEach(async(() => {
        httpClient = new HttpClient(httpHandler);

        dbService = new DatabaseService(sqLite, httpClient, storage, sqlitePorter);
    }))

    it('should create the app', async () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

  

  



});
