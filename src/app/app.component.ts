import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { log } from './model/Message';
import { AuthenticationService } from './services/authentication.service';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private db: DatabaseService,
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.StartApp();
  }

  async StartApp() {

    log('StartApp', 'Iniciando aplicación');
    
    this.platform.ready().then(async () => {

      log('StartApp', 'Plataforma lista');

      await this.db.StartDatabaseService(true).then(async (isRunning) => {

        log('StartApp', isRunning? 'Servicio de BD iniciado': 'Servicio de BD no iniciado');

      });
    });

  }
}

