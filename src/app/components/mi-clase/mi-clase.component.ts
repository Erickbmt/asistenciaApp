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
  "sede": "",
  "idAsignatura": "",
  "seccion": "",
  "nombreAsignatura": "",
  "nombreProfesor": "",
  "dia": "",
  "bloqueInicio": "",
  "bloqueTermino": "",
  "horaInicio": "",
  "horaFin": ""
  }`;

  constructor(private storage: StorageService, private router: Router) { }

  async ngOnInit() {
    // this.storage.getItem("QR_DATA").then(({ value }) => {
    //   this.clase = JSON.parse(value);
     this.mostrarDatosQROrdenados();
  // })};
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

  
}
