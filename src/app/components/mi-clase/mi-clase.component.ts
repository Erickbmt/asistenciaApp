import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-mi-clase',
  templateUrl: './mi-clase.component.html',
  styleUrls: ['./mi-clase.component.scss'],
})
export class MiClaseComponent implements OnInit {
  clase: any;
  hasData = false;
  jsonEmpty = 
  `{
  bloqueInicio = "",
  bloqueTermino = "",
  dia = "",
  horaFin = "",
  idAsignatura = "",
  horaInicio = "",
  nombreAsignatura = "",
  nombreProfesor = "",
  seccion = "",
  sede = "",
  }`;

  constructor(private storage: StorageService, private router: Router) { }

  async ngOnInit() {
    this.mostrarDatosQROrdenados();
  }

  async mostrarDatosQROrdenados() {
    this.clase = JSON.parse(this.jsonEmpty);
    this.hasData = false;
    const data = await this.storage.getQR();
    if (data === null) {
      return;
    }
    if (data === '') {
      return;
    }
    const clase = JSON.parse(data);
    if (clase.name === undefined) {
      return;
    }
    this.hasData = true;
    this.clase = clase;
  }

  // async mostrarDatosQr() {
  //   this.dino = JSON.parse(this.jsonEmpty);
  //   this.tieneDatos = false;
  //   // const data = await this.storage.getQR();
  //   if (data === null) {
  //     return;
  //   }
  //   if (data === '') {
  //     return;
  //   }
  //   const dino = JSON.parse(data);
  //   if (dino.name === undefined) {
  //     return;
  //   }
  //   this.hasData = true;
  //   this.dino = dino;
  // }
}
