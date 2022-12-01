import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { Router, NavigationExtras, Data } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  public usuario: Usuario;

  public correo = '';
  constructor(private router: Router, private toastController: ToastController, private auth: AuthService,
    private readonly databaseService: DatabaseService, private readonly storageService: StorageService,
    private alertController: AlertController) {
  }
  // Pescar algo de la bd  y compararlo con lo que puso el usuario
  ngOnInit() {
  }

  public ionViewDidLeave(): void {
    this.correo = '';
  }

  // Para navegar hacia preguntas
  public ingresar(): void {
    this.databaseService.getUserByMail(this.correo).then(vals => {
      if(vals.length <= 0){ 
        this.msgErrorCorreo();
        return;
      } //Poner alreta de k no existe
      this.storageService.setItem("forgot", JSON.stringify(vals[0]));
      this.router.navigate(['/pregunta']);
      console.log(vals);
      
    });

  }

  // Navegacion

  public iniciarSesion(): void {

    this.router.navigate(['/login']);
  }

  // Mensaje de error
  async msgErrorCorreo() {
    const alert = await this.alertController.create({
      header: 'Error Correo',
      message: 'El correo ingresado no existe, porfavor ingresa un correo ya registrado',
      buttons: ['OK']
    });

    await alert.present();
  } 

  
}

