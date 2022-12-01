import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {

  public usuario: Usuario;
  private contra: string;
  constructor(
    private activeroute: ActivatedRoute, private router: Router, private readonly storage: StorageService) {}

      
    

  ngOnInit() {
    this.storage.getItem("forgot").then(data => {
      const userData = JSON.parse(data.value);
      this.contra = userData.password;
      console.log(this.contra)
    })
  }

  // Navegar hacia el login

  public iniciarSesion(): void {

    this.router.navigate(['/login']);
  }
}
