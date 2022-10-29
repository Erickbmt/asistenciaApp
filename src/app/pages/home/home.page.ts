import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ViewWillLeave } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
// Animacion
import { Animation, AnimationController} from '@ionic/angular';
// Componentes
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiClaseComponent } from 'src/app/components/mi-clase/mi-clase.component';
// Storage
import { StorageService } from 'src/app/services/storage.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, AfterViewInit {

  // Animacion
  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;
  @ViewChild('qrAnimado', { read: ElementRef, static: true}) qrAnimado: ElementRef;

  // Componentes
  // @ViewChild(QrComponent) qrreader : QrComponent;
  // @ViewChild(MiClaseComponent) clase: MiClaseComponent;

  // public escaneando = false;

  // mostrarqr = false;


  public usuario: Usuario;

   constructor(
        private activeroute: ActivatedRoute
      , private router: Router
      , private alertController: AlertController
      , private animationController: AnimationController
      , private storage: StorageService
      , private auth: AuthenticationService) {
    
    
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        // Si tiene datos extra, se rescatan y se asignan a una propiedad
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
        // usamos el metodo anterior para que navege al componente y mandando los datos capturados hacia inicio
        this.inicioComponente();
      }
      else {
        this.router.navigate(['/login']);
      }
  });
}

ngOnInit() {
    
}

// async ngOnInit(): Promise<void> {
//   console.log('ESTOY EN HOME PAGE ', await this.storage.getItem('USER_DATA'));
// }
// ---------------------- Qr ---------------------------
// async showComponent(name: string) {
//   this.mostrarqr = name === 'qrreader';

//   if (name === 'qrreader') {
//     const content = await this.qrreader.scan();
//     await this.storage.saveQR(content);
//     this.mostrarqr = false;
//     this.clase.mostrarDatosQr();
//   } else {
//     this.qrreader.stop();
//   }
// }

// ionViewWillLeave(): void {
//   this.qrreader.stop();
// }

// Metodo de navegar pero para el componente de inicio
public inicioComponente(): void {
  const navigationExtras: NavigationExtras = {
    state: {
      usuario: this.usuario
    }
  };
  this.router.navigate(['/home/inicio'], navigationExtras);
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

// Funcion para el cambio de componentes
segmentChanged($event) {
  this.router.navigate(['home/' + $event.detail.value]);
}

public login(): void {
  this.router.navigate(['/login']);
}
}
