import { Component, OnInit } from '@angular/core';
import { capSQLiteChanges } from '@capacitor-community/sqlite';
import { DatabaseService } from './../../services/database.service';
import { log, showAlertDUOC, showAlertYesNoDUOC, showToast } from 'src/app/model/Message';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageEnum } from 'src/app/model/MessageEnum';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  correo: string = '';
  password: string = '';
  darkMode: boolean = false;

  constructor(private auth: AuthenticationService, private db: DatabaseService) {
  }

  ngOnInit() {
      
  }

  async ingresar() {
    this.auth.login(this.correo, this.password);
  }

  async eliminar() {
    log('eliminar', 'Mostrar usuarios antes de eliminar');
    this.db.logUsers();
    const resp1: MessageEnum = await showAlertYesNoDUOC(`¿Desea eliminar al usuario ${this.correo} ?`);
    if (resp1 === MessageEnum.YES) {
      const resp2: capSQLiteChanges = await this.db.deleteUser(this.correo);
      if (resp2.changes.changes === 1) {
        await showAlertDUOC(`El usuario ${this.correo} fue eliminado correctamente.`);
      } else {
        await showAlertDUOC(`El usuario ${this.correo} no existe en la base de datos.`);
      }
    }
    log('eliminar', 'Mostrar usuarios después de eliminar');
    this.db.logUsers();
  }

  registrar() {
    showAlertDUOC('Programa aquí el registro de nuevos usuarios.');
  }

}

