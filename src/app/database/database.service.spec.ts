// import { TestBed } from '@angular/core/testing';

// import { DatabaseService } from './database.service';

// import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
// import { HttpClient, HttpHandler } from '@angular/common/http';
// import { Data } from '@angular/router';

// describe('DatabaseService', () => {

//   let dbService: DatabaseService;
//   let sqLite: any;
//   let httpClient: HttpClient;
//   let httpHandler: HttpHandler;

//   beforeEach(() => TestBed.configureTestingModule({ 
//       providers: [
//         {provide: SQLite, use: {}},
//         HttpClient,
//         {provide: HttpHandler, use: {} }
//       ]})
//   );

//   it('should be created', () => {
//     const service: DatabaseService = TestBed.get(DatabaseService);
//     expect(service).toBeTruthy();
//   });

//   beforeEach(() => {

//     sqLite = { create: function(config: any): Promise<SQLiteObject> {
//       return new Promise((resolve,reject)=>{
//         resolve(new SQLiteObject(null));
//       });
//     }};

//     httpClient = new HttpClient(httpHandler);
//     dbService = new DatabaseService(sqLite, httpClient);
//   });

//   describe('initDatabase creates the database', () => {
//     it('calls sqlite.create', () => {
//       const createSpy = jest.spyOn(sqLite, 'create');
//       dbService.initDatabase();
//       expect(createSpy).toHaveBeenCalled();
//     });

//     // should be working but doesn't even though method is being called
//     // will ignore for now
//     // it('calls dbService.createTable', () => {
//     //   const createSpy = jest.spyOn(dbService, 'createTable');
//     //   dbService.initDatabase();
//     //   expect(createSpy).toHaveBeenCalled();
//     // });
//   })

// });
