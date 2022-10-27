import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  public usuario : Usuario;

 constructor (private router : Router, ){
  if (this.router.getCurrentNavigation().extras.state) {

    // Si tiene datos extra, se rescatan y se asignan a una propiedad
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;

  }
  else {
    this.router.navigate(['/login']);
  }
 }
  public  ngOnInit(): void {
    
  }

}
