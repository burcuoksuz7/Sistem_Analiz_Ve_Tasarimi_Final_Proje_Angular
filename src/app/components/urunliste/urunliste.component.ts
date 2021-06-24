import { UrunsecDialogComponent } from '../dialogs/urunsec-dialog/urunsec-dialog.component';
import { MyAlertService } from '../../services/myAlert.service';
import { Sonuc } from '../../models/Sonuc';
import { Kayit } from '../../models/Kayit';
import { ApiService } from '../../services/api.service';
import { Kategori } from '../../models/Kategori';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { KategoriComponent } from '../kategori/kategori.component';

@Component({
  selector: 'app-urunliste',
  templateUrl: './urunliste.component.html',
  styleUrls: ['./urunliste.component.css']
})
export class UrunlisteComponent implements OnInit {
  kayitlar: Kayit[];
  kategoriId: number=0;
  secKategori: Kategori;
  displayedColumns = ['urunGorsel', 'urunAd', 'urunFiyat', 'urunAciklama', 'urunKatId', 'detay'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  dialogRef: MatDialogRef<UrunsecDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.kategoriId = p.kategoriId;
      this.KategoriById();
      this.kayitListele();
    });
  }
  kayitListele() {
    this.apiServis.KategoriUrunListe(this.kategoriId).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  KategoriById() {
    this.apiServis.KategoriById(this.kategoriId).subscribe((d: Kategori) => {
      this.secKategori = d;
    });
  }
  Ekle() {
    this.dialogRef = this.matDialog.open(UrunsecDialogComponent, {
      width: '800px'
    });

    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        var kayit: Kayit = new Kayit();
        kayit.kayitKatId = this.kategoriId;
        kayit.kayitUrunId = d.urunId;
        this.apiServis.KayitEkle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.kayitListele();
          }
        });
      }

    });

  }
  Sil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });

    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.urunBilgi.urunAd + " isimli ürünü kategoriden çıkarmak istiyor musunuz?";

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.kayitListele();
          }
        });
      }
    });
  }
}
