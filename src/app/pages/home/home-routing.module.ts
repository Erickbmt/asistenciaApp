import { QrComponent } from './../../components/qr/qr.component';
import { InicioComponent } from './../../components/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { MiClaseComponent } from 'src/app/components/mi-clase/mi-clase.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,

    children: [
      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'qr',
        component: QrComponent
      },
      {
        path: 'mi-clase',
        component: MiClaseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
