import { Kayit } from '../../models/Kayit';

import { MyAlertService } from '../../services/myAlert.service';
import { Sonuc } from '../../models/Sonuc';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Urun } from 'src/app/models/Urun';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UrunDialogComponent } from '../dialogs/urun-dialog/urun-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { FotoyukleDialogComponent } from '../dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { Kategori } from 'src/app/models/Kategori';

@Component({
  selector: 'app-urun',
  templateUrl: './urun.component.html',
  styleUrls: ['./urun.component.scss']
})
export class UrunComponent implements OnInit {
  urunler: Urun[];
  dialogRef: MatDialogRef<UrunDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  fotoDialogRef: MatDialogRef<FotoyukleDialogComponent>;
  dataSource: any;
  displayedColumns = ['urunGorsel', 'urunAd', 'urunFiyat', 'urunAciklama', 'urunKatId', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.UrunListele();
  }

  UrunListele() {
    this.apiServis.UrunListe().subscribe((d: Urun[]) => {
      this.urunler = d;
      this.dataSource = new MatTableDataSource(this.urunler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  UrunFiltrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Ekle() {
    var yeniKayit: Urun = new Urun();
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        });

      }
    });
  }

  Duzenle(kayit: Urun) {
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {

        kayit.urunAd = d.urunAd;
        kayit.urunFiyat = d.urunFiyat;
        kayit.urunAciklama = d.urunAciklama;
        kayit.urunKatId = d.urunKatId;


        this.apiServis.UrunDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        });

      }
    });
  }

  Sil(kayit: Urun) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.urunAd + " isimli ürün silinecektir, emin misiniz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.urunId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        });
      }
    });

  }


  FotoGuncelle(kayit: Urun) {
    this.fotoDialogRef = this.matDialog.open(FotoyukleDialogComponent, {
      width: '400px',
      data: kayit
    });

    this.fotoDialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.urunId = kayit.urunId;
        this.apiServis.UrunFotoGuncelle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        });
      }
    });
  }
}
