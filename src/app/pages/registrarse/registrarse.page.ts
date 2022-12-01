import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './../../services/database.service';
import { StorageService } from 'src/app/services/storage.service';
import { ViewWillEnter } from '@ionic/angular';
import { Usuario } from './../../model/Usuario';
import { Router } from '@angular/router';
import { showAlert, showAlertDUOC, showAlertError } from 'src/app/model/Message';
import { capSQLiteChanges, DBSQLiteValues } from '@capacitor-community/sqlite';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
/*export class RegistrarsePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  
}*/

export class RegistrarsePage implements ViewWillEnter {

  correo = '';
  password = '';
  nombre = '';
  preguntaSecreta = '';
  respuestaSecreta = '';
  sesionActiva = '';
  cantidad = 0;

  constructor(private router: Router, private db: DatabaseService) { }

  ionViewWillEnter(): void {
    this.setUsersLength();
  }

  setUsersLength() {
    this.db.readUsers().then((resp: DBSQLiteValues) => {
      this.cantidad = resp.values.length;
    }).catch((err) => {
      showAlertError('CreateUserPage.setUsersLenght', err);
    });
  }

  async registerNewUser() {
    const usu: Usuario = new Usuario();
    const msg = usu.validateUserFields(
      this.correo,
      this.password,
      this.nombre,
      this.preguntaSecreta,
      this.respuestaSecreta);

    if (msg !== '') {
      showAlertDUOC(msg);
      return;
    }

 
    await this.db.createUser(
      this.correo,
      this.password,
      this.nombre,
      this.preguntaSecreta,
      this.respuestaSecreta,
      'N'
    ).then((resp: capSQLiteChanges) => {
      if (resp.changes.changes === 1) {
        showAlertDUOC('Su cuenta fue creada con éxito');
        this.router.navigate(['login']);
      } else {
        showAlertDUOC('Su cuenta no pudo ser creada con éxito. Comuníquese con el Administrador del Sistema o intente nuevamente más tarde');
      }
    }).catch((err) => {
      showAlertError('CreateUserPage.registerNewUser', err);
    });
  }


  goToLogin() {
    this.router.navigate(['login']);
  }

}
