import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { InicioComponent } from 'src/app/components/inicio/inicio.component';
import { MiClaseComponent } from 'src/app/components/mi-clase/mi-clase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,InicioComponent,QrComponent,MiClaseComponent,ForoComponent]
})
export class HomePageModule {}
