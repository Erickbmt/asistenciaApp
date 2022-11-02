import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  public usuario: Usuario;

  public correo = '';
  constructor(private router: Router, private toastController: ToastController, private auth: AuthService) {
    this.correo = 'atorres@duocuc.cl';
  }
  // Pescar algo de la bd  y compararlo con lo que puso el usuario
  ngOnInit() {
  }

  // Para navegar hacia preguntas
  public ingresar(): void {
    this.router.navigate(['/pregunta']);
  }

  // Navegacion

  public iniciarSesion(): void {

    this.router.navigate(['/login']);
  }

  // Mensaje de error
 

  
}

