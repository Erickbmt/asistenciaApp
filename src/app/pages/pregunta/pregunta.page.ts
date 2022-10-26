import { Component, OnInit } from '@angular/core';
// Importaciones
import { Usuario } from 'src/app/model/Usuario';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LowerCasePipe, UpperCasePipe } from '@angular/common';


@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

// Clase usuario
  public usuario: Usuario;

// Constructor que traera la información de la anterior pagina
  constructor(
    private activeroute: ActivatedRoute
  , private router: Router
  , private toastController: ToastController) {

  this.activeroute.queryParams.subscribe(params => {
  if (this.router.getCurrentNavigation().extras.state) {

    // Si tiene datos extra, se rescatan y se asignan a una propiedad
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;

  } else {
    /*
      Si no vienen datos extra desde la página anterior, quiere decir que el usuario
      intentó entrar directamente a la página home sin pasar por el login,
      de modo que el sistema debe enviarlo al login para que inicie sesión.
    */
    this.router.navigate(['/login']);
  }
});
}

  ngOnInit() {
  }
// Validar la respuesta
/*
  Si el correo ingresado con anterioridad es igual a este y su contraseña es igual a esta entonces
  navegara a la pagina correcto si no un error.
*/
  public ingresarRespuesta(): void {
    if (!this.validarRespuesta(this.usuario)){
      return;
    }
    this.recuperarContrasena();
  }
  // Navegar despues de responde la pregunta hacia la pagina Correcto o Incorrecto
  public recuperarContrasena(): void {

    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/correcto'], navigationExtras);
  }

// -------------------- Validar errores ---------------------
  // Validar respuesta cuando no haya nada puesto
  public validarRespuesta(usuario: Usuario): boolean {
    const user = usuario.buscarRespuestaValida(this.usuario.respuesta);

    if (user) {
      this.usuario= user;
      return true;
    }
    else {
      this.incorrecto();
      return false;
    }
  }
  // Mostrar mensaje
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
// -------------------------------------------------------------
// Navegar hacia inicio de sesion
  public iniciarSesion(): void {
    this.router.navigate(['/login']);
  }

  // Navegacion hacia el incorrecto
  // Si tratas de quitar el navigation extras
  // No podras ingresar a la pagina y sera redireccionado directamente al login
  // segun el metodo constructor de incorrecto.page.ts
  // Hace que si recibe datos de cualquier tipo de esta pagina hacia incorrecto te dejara estar ahi
  // Si le quitas navigation extras no devolvera datos y seras redirigido
  public incorrecto(): void {

    this.usuario.password= '';

    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/incorrecto'], navigationExtras);
  }
}
