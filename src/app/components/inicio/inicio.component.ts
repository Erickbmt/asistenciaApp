import { Component, NgModule, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [InicioComponent]
})

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  public usuario : Usuario;

 constructor (private router : Router, private storage: StorageService ){
 }
ngOnInit() {
    this.storage.getItem('USER_DATA').then(({ value }) => { 
      this.usuario=JSON.parse(value);      
     });
}

}
