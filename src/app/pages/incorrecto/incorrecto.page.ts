import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
})
export class IncorrectoPage implements OnInit {

  public usuario: Usuario;

  // Con este metodo constructor lo que hago es que
  // Con la pagina anterior limpie los datos de contraseña
  // Y aun recibiendo datos vacios me dejara permanecer en la pagina
  // Para que asi tenga que pasar por el proceso de Recuperar contraseña y no entrar directamente a la pagina
  // Explicadiña rapida del codigo por erick kieeee
  constructor( private activatedroute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
  }

  public iniciarSesion(): void {

    this.router.navigate(['/login']);
  }

}
