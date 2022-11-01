import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Browser } from '@capacitor/browser';
import { AlertController, ViewWillLeave, ViewDidEnter } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { AfterViewInit} from '@angular/core';
// Animacion
import { Animation, AnimationController} from '@ionic/angular';
// Componentes
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiClaseComponent } from 'src/app/components/mi-clase/mi-clase.component';
import { InicioComponent } from 'src/app/components/inicio/inicio.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
// Storage
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
//deberia arreglarse
export class HomePage implements AfterViewInit, ViewDidEnter, ViewWillLeave {

  // Animacion
  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;
  @ViewChild('qrAnimado', { read: ElementRef, static: true}) qrAnimado: ElementRef;

  //Componentes
  @ViewChild(QrComponent) qr : QrComponent;
  @ViewChild(MiClaseComponent) miclase: MiClaseComponent;
  @ViewChild(InicioComponent) inicio: InicioComponent;
  @ViewChild(ForoComponent) foro: ForoComponent;

  showinicio = true;
  showqr = false;
  showmiclase = false;
  showforo = false;

  selectedComponent = '';

  public usuario: Usuario;

   constructor(
        private activeroute: ActivatedRoute
      , private router: Router
      , private alertController: AlertController
      , private animationController: AnimationController
      , private storage: StorageService
      , private auth: AuthService) {

}

ionViewDidEnter(): void {
  this.showComponent('inicio');
}

ionViewWillLeave(): void {
  this.qr.stop();
}

async showComponent(name: string) {
  this.showinicio = name === 'inicio';
  this.showqr = name === 'qr';
  this.showmiclase = name === 'mi-clase';
  this.showforo = name === 'foro';

  if (name === 'qr') {
    const content = await this.qr.scan();
    await this.storage.saveQR(content);
    this.showqr = false;
    this.selectedComponent = 'mi-clase';
    this.showmiclase = true;
    this.miclase.mostrarDatosQROrdenados();
  }
}


segmentChanged($event) {
  this.showComponent($event.detail.value);
}

async stopScanner() {
  this.qr.stop();
  this.showComponent('inicio');
  this.selectedComponent = 'inicio';
}

// Animaciones
public ngAfterViewInit(): void {
  const animation = this.animationController
    .create()
    .addElement(this.titulo.nativeElement)
    .iterations(Infinity)
    .duration(18000)
    .fromTo('transform', 'translate(100%)', 'translate(-100%)')
    .fromTo('opacity', 1, 1);
  animation.play();
  this.animateButton(); //ANIMACION "BUTTON"
}

public animateButton() {
   this.animationController
    .create()
    .addElement(this.qrAnimado.nativeElement)
    .duration(500)
    .iterations(1)
    .fromTo('transform', 'translate(100%)', 'translate(0%)')
    .play();
}
// -----------------------------------------------------------

// Para el cerrar sesion bruh
salir() {
  this.auth.logout();
}

}
