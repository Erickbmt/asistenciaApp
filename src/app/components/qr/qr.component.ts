import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent implements OnInit {

  escaneando: boolean = false;

  constructor() { }

  public ngOnInit():void {}

  async checkPermission() {
    return new Promise(async (resolve) => {
      const { granted } = await BarcodeScanner.checkPermission({ force: true });
      if (!granted) {
        BarcodeScanner.openAppSettings();
        resolve(false);
        return;
      }
      resolve(true);
    });
  }
  async scan() {
    const allowed = await this.checkPermission();
    if (allowed) {
      const aux = document.body.style.background;
      document.body.style.background = 'transparent';
      const { hasContent, content } = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] });
      document.body.style.background = aux;
      if (hasContent) {
        return content;
      }
      alert('No fue posible detectar un código QR');
      return '';
    }
    alert('Para escanear un código QR debe otorgar permisos para la cámara');
    return '';
  }

  async stop() {
    BarcodeScanner.stopScan();
  }

}
