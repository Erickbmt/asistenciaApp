import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { log } from './model/Message';
import { AuthService } from './services/authentication.service';
import { DatabaseService } from './services/database.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private storage:StorageService, 
    private platform: Platform,
    private db: DatabaseService,
    private auth: AuthService,
    private router: Router
  ) {
    this.StartApp();
    this.initializeApp();
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

  async initializeApp() {
    this.platform.ready().then(async () => {
      await this.storage.init();
    });
  }
}

