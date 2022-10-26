import { LoginPage } from './../login/login.page';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  public bloqueInicio = 0;
  public bloqueTermino = 0;
  public dia = '';
  public horaFin = '';
  public horaInicio = '';
  public idAsignatura = '';
  public nombreAsignatura = '';
  public nombreProfesor = '';
  public seccion = '';
  public sede = '';

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

      } else {
        /*
          Si no vienen datos extra desde la página anterior, quiere decir que el usuario
          intentó entrar directamente a la página home sin pasar por el login,
          de modo que el sistema debe enviarlo al login para que inicie sesión.
        */
      }
  });
}

public ngOnInit() {

}

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
  this.limpiarDatos(); // QR
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



public cerrarSesion(): void {
  for (const [key, value] of Object.entries(this.usuario)) {
      Object.defineProperty(this.usuario, key, {value: ''});

      this.router.navigate(['/login']);
    }
  }

public limpiarDatos(): void {
  this.escaneando = false;
  this.datosClases = false;
  this.datosQR = '';
  this.loading = null;
  (document.getElementById('input-file') as HTMLInputElement).value = '';
}

public async comenzarEscaneoQR() {
  this.limpiarDatos();
  const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
    video: {facingMode: 'environment'}
  });
  this.video.nativeElement.srcObject = mediaProvider;
  this.video.nativeElement.setAttribute('playsinline', 'true');
  this.loading = await this.loadingController.create({});
  await this.loading.present();
  this.video.nativeElement.play();
  this.datosClases = true;
  requestAnimationFrame(this.verificarVideo.bind(this));
}

public obtenerDatosQR(source?: CanvasImageSource): boolean {
  let w = 0;
  let h = 0;
  if (!source) {
    this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
    this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
  }

  w = this.canvas.nativeElement.width;
  h = this.canvas.nativeElement.height;
  console.log(w + ' ' + h);

  const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
  context.drawImage(source? source : this.video.nativeElement, 0, 0, w, h);
  const img: ImageData = context.getImageData(0, 0, w, h);
  const qrCode: QRCode = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
  if (qrCode) {
    this.escaneando = false;
    this.datosQR = qrCode.data;
    this.mostrarDatosQROrdenados(this.datosQR);
  }
  return this.datosQR !== '';
}

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

async verificarVideo() {
  if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
      this.escaneando = true;
    }
    if (this.obtenerDatosQR()) {
      console.log(1);
    } else {
      if (this.escaneando) {
        console.log(2);
        requestAnimationFrame(this.verificarVideo.bind(this));
      }
    }
  } else {
    console.log(3);
    requestAnimationFrame(this.verificarVideo.bind(this));
  }
}

public detenerEscaneoQR(): void {
  this.escaneando = false;
}

public cargarImagenDesdeArchivo(): void {
  this.limpiarDatos();
  this.fileinput.nativeElement.click();
  this.datosClases = true;
}

public verificarArchivoConQR(files: FileList): void {
  const file = files.item(0);
  const img = new Image();
  img.onload = () => {
    this.obtenerDatosQR(img);
  };
  img.src = URL.createObjectURL(file);
}
segmentChanged($event) {
  this.router.navigate(['home/' + $event.detail.value]);
}
}
