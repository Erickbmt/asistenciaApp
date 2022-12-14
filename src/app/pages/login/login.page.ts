import { Component, OnInit } from '@angular/core';
import { capSQLiteChanges } from '@capacitor-community/sqlite';
import { DatabaseService } from './../../services/database.service';
import { log, showAlertDUOC, showAlertYesNoDUOC, showToast } from 'src/app/model/Message';
import { AuthService } from 'src/app/services/authentication.service';
import { MessageEnum } from 'src/app/model/MessageEnum';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  correo: string = '';
  password: string = '';
  constructor(private auth: AuthService, private db: DatabaseService, private router : Router, private storage: StorageService) {
    //this.correo = 'atorres@duocuc.cl';
    //this.password = '1234';
    

  }
  public ionViewDidLeave(): void {
    this.correo = '';
    this.password = '';
  }
  async ingresar() {
    this.auth.login(this.correo, this.password);
  }
 
  public ingresoCorreo(): void {
    this.router.navigate(['/correo']);
  }

  public registrarse(): void {
    this.router.navigate(['/registrarse']);
  }
}

