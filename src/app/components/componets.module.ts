import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule }  from '@ionic/angular';

import { InicioComponent } from './inicio/inicio.component';
import { MiClaseComponent } from 'src/app/components/mi-clase/mi-clase.component';
import { ForoComponent } from './foro/foro.component';

@NgModule({
  declarations: [
    //aqui declaramos todos los componentes
    InicioComponent,
    MiClaseComponent,
    ForoComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  exports: [
    //aqui exportamos todos los componentes
    InicioComponent,
    MiClaseComponent,
    ForoComponent,
  ]
})
export class ComponentsModule { }