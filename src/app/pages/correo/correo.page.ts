import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  public usuario: Usuario;
  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('','','','','');
    this.usuario.nombre = '';
    this.usuario.correo = '';
    this.usuario.pregunta = '';
  }

  ngOnInit() {
  }

  // Validar si el correo ingresado es alguno de estos usuarios
  public ingresar(): void {

    if(!this.validarUsuario(this.usuario)) {
      return;
    }

    this.ingresoUsuario();
  }

  // Para navegar hacia preguntas
  public ingresoUsuario(): void {

    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/pregunta'], navigationExtras);

  }

  // Validacion del correo del usuario
  public validarUsuario(usuario: Usuario): boolean {
    const user = usuario.buscarCorreoValido(this.usuario.correo);

    if (user) {
      this.usuario= user;
      return true;
    }
    else {
      this.mostrarMensaje('Correo no valido')
      return false;
    }
  }

  // Navegacion

  public iniciarSesion(): void {

    this.router.navigate(['/login']);
  }

  // Mensaje de error
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
}

