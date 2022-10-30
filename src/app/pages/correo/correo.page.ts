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
    this.usuario.nombre = '';
    this.usuario.correo = '';
    this.usuario.preguntaSecreta = '';
  }

  ngOnInit() {
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

