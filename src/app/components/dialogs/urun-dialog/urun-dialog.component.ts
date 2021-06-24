import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Urun } from '../../../models/Urun';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Kategori } from 'src/app/models/Kategori';

@Component({
  selector: 'app-urun-dialog',
  templateUrl: './urun-dialog.component.html',
  styleUrls: ['./urun-dialog.component.css']
})
export class UrunDialogComponent implements OnInit {
  kategoriler:Kategori[];
  dialogBaslik: string;
  yeniKayit: Urun;
  islem: string;
  frm: FormGroup;
  constructor(
    private apiServis:ApiService,
    public dialogRef: MatDialogRef<UrunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder

  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Ürün Ekle"
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Ürün Düzenle"
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.kategoriListele();

  }

  
kategoriListele(){
  this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
    this.kategoriler=d;
  })
}

  FormOlustur() {
    return this.frmBuild.group({
      urunAd: [this.yeniKayit.urunAd],
      urunFiyat: [this.yeniKayit.urunFiyat],
      urunAciklama: [this.yeniKayit.urunAciklama],
      urunGorsel: [this.yeniKayit.urunGorsel],
      urunKatId: [this.yeniKayit.urunKatId],
    });
  }
}
