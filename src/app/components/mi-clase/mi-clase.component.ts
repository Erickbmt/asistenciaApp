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
     this.mostrarDatosQROrdenados();
  }
  
  

  async mostrarDatosQROrdenados() {
    this.clase = JSON.parse(this.jsonEmpty);
    this.hasData = false;
    const data = await this.storage.getQR();
    console.log('iniciando mostrarDatos...');
    if (data === null) {
      console.log('Datos nulos');
      return;
    }
    if (data === '') {
      console.log('No hay datos');
      return;
    }
    const clase = JSON.parse(data);
    if (clase.sede === undefined) {
      console.log('La clase y su nombre no estan definidos');
      return;
    }
    this.hasData = true;
    this.clase = clase;
    console.log('Pasamos todo con exito!');
  }

  public limpiarDatos(): void{
    this.clase = this.storage.clearQr();
    console.log('Se ha borrado exitosamente datos Mi-Clase');
  }

}
