import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mi-clase',
  templateUrl: './mi-clase.component.html',
  styleUrls: ['./mi-clase.component.scss'],
})
export class MiClaseComponent implements OnInit {

  public bloqueInicio = 0;
  public bloqueTermino = 0;
  public dia = '';
  public horaFin = '';
  public idAsignatura = '';
  public horaInicio = '';
  public nombreAsignatura = '';
  public nombreProfesor = '';
  public seccion = '';
  public sede = '';

  constructor() { }

  public ngOnInit():void {}

  public mostrarDatosQROrdenados(datosQR: string): void {
    const objetoDatosQR = JSON.parse(datosQR);
    this.bloqueInicio = objetoDatosQR.bloqueInicio;
    this.bloqueTermino = objetoDatosQR.bloqueTermino;
    this.dia = objetoDatosQR.dia;
    this.horaFin = objetoDatosQR.horaFin;
    this.horaInicio = objetoDatosQR.horaInicio;
    this.idAsignatura = objetoDatosQR.idAsignatura;
    this.nombreAsignatura = objetoDatosQR.nombreAsignatura;
    this.nombreProfesor = objetoDatosQR.nombreProfesor;
    this.seccion = objetoDatosQR.seccion;
    this.sede = objetoDatosQR.sede;
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
