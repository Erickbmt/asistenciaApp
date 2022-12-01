import { Component, OnInit } from '@angular/core';
// Importaciones
import { Usuario } from 'src/app/model/Usuario';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LowerCasePipe, UpperCasePipe } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

// Clase usuario
  private usuario: Usuario;
  private pregunta: string;
  private respuesta = '';
  private respuestaEsperada: string;
// Constructor que traera la información de la anterior pagina
  constructor(
    private activeroute: ActivatedRoute
  , private router: Router
  , private toastController: ToastController
  , private storage: StorageService) {

  }

  ngOnInit() {
    this.storage.getItem("forgot").then(data => {
      const userData = JSON.parse(data.value);
      this.pregunta = userData.preguntaSecreta;
      this.respuestaEsperada = userData.respuestaSecreta;
    })
  }
// Validar la respuesta

  //Si el correo ingresado con anterioridad es igual a este y su contraseña es igual a esta entonces
  //navegara a la pagina correcto si no un error.

 public ingresarRespuesta(): void {

 
  //Navegar despues de responde la pregunta hacia la pagina Correcto o Incorrecto
  //public recuperarContrasena(): void {
  //console.log(this.respuesta);
  //console.log(this.respuestaEsperada);
  if((this.respuesta).trim() === this.respuestaEsperada) {
    this.router.navigate(['/correcto'],);
  }else {
    this.router.navigate(['/incorrecto']);
  }
  }
public iniciarSesion(){
  this.router.navigate(['/login']);
}
}
