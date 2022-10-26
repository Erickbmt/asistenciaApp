import { LoginPage } from './../login/login.page';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Animation, AnimationController} from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import jsQR, { QRCode } from 'jsqr';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, AfterViewInit {

  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;
  @ViewChild('qrAnimado', { read: ElementRef, static: true}) qrAnimado: ElementRef;

  @ViewChild('video', { static: false })
  private video: ElementRef;

  @ViewChild('canvas', { static: false })
  private canvas: ElementRef;

  @ViewChild('fileinput', { static: false })
  private fileinput: ElementRef;

  public escaneando = false;
  public datosClases = false;
  public datosQR = '';
  public loading: HTMLIonLoadingElement = null;



  public usuario: Usuario;

   constructor(
        private activeroute: ActivatedRoute
      , private router: Router
      , private alertController: AlertController
      , private animationController: AnimationController
      , private loadingController: LoadingController) {
    
    
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

public ngOnInit() {

}

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
public cerrarSesion(): void {
  for (const [key, value] of Object.entries(this.usuario)) {
      Object.defineProperty(this.usuario, key, {value: ''});

      this.router.navigate(['/login']);
    }
  }

// Funcion para el cambio de componentes
segmentChanged($event) {
  this.router.navigate(['home/' + $event.detail.value]);
}
}
