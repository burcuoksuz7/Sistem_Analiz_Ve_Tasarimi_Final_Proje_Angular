import { Sonuc } from './../models/Sonuc';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent } from '../components/dialogs/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MyAlertService {
  private dialofRef: MatDialogRef<AlertDialogComponent>;
  constructor(
    private matDialog: MatDialog
  ) { }

  AlertUygula(s: Sonuc) {
    var baslik = "";
    if (s.islem) {
      baslik = "İşlem Tamam";
    } else {
      baslik = "Hata";
    }

    this.dialofRef = this.matDialog.open(AlertDialogComponent, {
      width: '300px'
    });
    this.dialofRef.componentInstance.dialogBaslik = baslik;
    this.dialofRef.componentInstance.dialogMesaj = s.mesaj;
    this.dialofRef.componentInstance.dialogIslem = s.islem;

    this.dialofRef.afterClosed().subscribe(d => {
      this.dialofRef = null;
    });
  }
}
