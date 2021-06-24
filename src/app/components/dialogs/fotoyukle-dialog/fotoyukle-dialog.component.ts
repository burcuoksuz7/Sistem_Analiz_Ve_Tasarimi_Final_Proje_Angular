import { Kayit } from './../../../models/Kayit';
import { ApiService } from './../../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Urun } from 'src/app/models/Urun';
import { UrunFoto } from './../../../models/UrunFoto';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-fotoyukle-dialog',
  templateUrl: './fotoyukle-dialog.component.html',
  styleUrls: ['./fotoyukle-dialog.component.css']
})
export class FotoyukleDialogComponent implements OnInit {
  secilenFoto: any;
  urunFoto: UrunFoto = new UrunFoto();
  secUrun: Urun;
  constructor(
    public dialogRef: MatDialogRef<FotoyukleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService

  ) {
    this.secUrun = this.data;
  }

  ngOnInit() {
  }
  FotoSec(e) {
    var fotolar = e.target.files;
    var foto = fotolar[0];

    var fr = new FileReader();
    fr.onloadend = () => {
      this.secilenFoto = fr.result;
      this.urunFoto.fotoData = fr.result.toString();
      this.urunFoto.fotoUzanti = foto.type;
    };
    fr.readAsDataURL(foto);
  }
}
