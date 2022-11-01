import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from  '@angular/common/http';
import { SQLiteService } from './services/sqlite.service';
import { AuthGuardService } from './services/auth-guard.service';
import { DatabaseService } from './services/database.service';
import { AuthService } from './services/authentication.service';
import { StorageService } from './services/storage.service';
import { Storage } from '@ionic/storage';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers:[
  SQLiteService,
  AuthGuardService,
  DatabaseService,
  AuthService,
  StorageService,
  Storage,
   { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
