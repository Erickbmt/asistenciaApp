import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from  '@angular/common/http';
import { SqliteService } from './services/sqlite.service';
import { AuthGuardService } from './services/auth-guard.service';
import { DatabaseService } from './services/database.service';
import { AuthenticationService } from './services/authentication.service';
import { StorageService } from './services/storage.service';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers:[
  SqliteService,
  AuthGuardService,
  DatabaseService,
  AuthenticationService,
  StorageService,
   { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
