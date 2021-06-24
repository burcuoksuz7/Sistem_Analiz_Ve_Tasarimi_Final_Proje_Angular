import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from '../../services/myAlert.service';
import { Sonuc } from '../../models/Sonuc';
import { Kategori } from '../../models/Kategori';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Urun } from 'src/app/models/Urun';
import { ApiService } from '../../services/api.service';
import { Kayit } from '../../models/Kayit';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { KategoriComponent } from '../kategori/kategori.component';

@Component({
  selector: 'app-kategoriliste',
  templateUrl: './kategoriliste.component.html',
  styleUrls: ['./kategoriliste.component.css']
})
export class KategorilisteComponent implements OnInit {
  kayitlar: Kayit[];
  kategoriler: Kategori[];
  urunId: number;
  kategoriId: number;
  secUrun: Urun;
  dataSource: any;
  displayedColumns = ['urunAd', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogref: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.KategoriListele();
    this.route.params.subscribe(p => {
      if (p) {
        this.urunId = p.urunId;
        this.UrunGetir();
        this.KayitListele();
      }
    });
  }

  UrunGetir() {
    this.apiServis.UrunById(this.urunId).subscribe((d: Urun) => {
      this.secUrun = d;
    });
  }

  KayitListele() {
    this.apiServis.UrunKategoriListe(this.urunId).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
    });
  }
  KategoriSec(kategoriId: number) {
    this.kategoriId = kategoriId;
  }
  KategoriEkle() {
    if (this.kategoriId) {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Kategori Seçiniz!";
      this.alert.AlertUygula(s);
      return false;

    }

    var kayit: Kayit = new Kayit();
    kayit.kayitUrunId = this.urunId;
    kayit.kayitKatId = this.kategoriId;

    this.apiServis.KayitEkle(kayit).subscribe((s: Sonuc) => {
      this.alert.AlertUygula(s);
      if (s.islem) {
        this.KayitListele();
      }
    });
  }


  KategoriSil(kayit: Kayit) {
    this.dialogref = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.dialogref.componentInstance.dialogMesaj = kayit.kategoriBilgi.kategoriAd + " Kategorisi Silinecektir Onaylıyor musunuz?";

    this.dialogref.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });
      }
    });

  }
}


