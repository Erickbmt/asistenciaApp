import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {

  public usuario: Usuario;

  constructor(
    private activeroute: ActivatedRoute, private router: Router) {}

      
    

  ngOnInit() {
  }

  // Navegar hacia el login

  public iniciarSesion(): void {

    this.router.navigate(['/login']);
  }
}
