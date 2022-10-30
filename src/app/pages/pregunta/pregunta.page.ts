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

  }

  ngOnInit() {
  }
// Validar la respuesta

  //Si el correo ingresado con anterioridad es igual a este y su contraseña es igual a esta entonces
  //navegara a la pagina correcto si no un error.

 public ingresarRespuesta(): void {

 
  //Navegar despues de responde la pregunta hacia la pagina Correcto o Incorrecto
 //public recuperarContrasena(): void {

    this.router.navigate(['/correcto'],);
  }

// -------------------- Validar errores ---------------------
  // Validar respuesta cuando no haya nada puesto
  // public validarRespuesta(usuario: Usuario): boolean {
  //   const user = usuario.buscarRespuestaValida(this.usuario.respuesta);

  // Navegacion hacia el incorrecto
  // Si tratas de quitar el navigation extras
  // No podras ingresar a la pagina y sera redireccionado directamente al login
  // segun el metodo constructor de incorrecto.page.ts
  // Hace que si recibe datos de cualquier tipo de esta pagina hacia incorrecto te dejara estar ahi
  // Si le quitas navigation extras no devolvera datos y seras redirigido
  public incorrecto(): void {
    this.router.navigate(['/incorrecto']);
  }
}
