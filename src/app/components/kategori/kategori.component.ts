import { MyAlertService } from '../../services/myAlert.service';
import { Sonuc } from '../../models/Sonuc';
import { Kategori } from '../../models/Kategori';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { KategoriDialogComponent } from '../dialogs/kategori-dialog/kategori-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.scss']
})
export class KategoriComponent implements OnInit {
  kategoriler: Kategori[];
  dataSource: any;
  displayedColumns = ['kategoriAd','detay'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<KategoriDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.KategoriListele();
  }
  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  Filtrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Ekle() {
    var yenikayit: Kategori = new Kategori();
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: '500px',
      data: {
        kayit: yenikayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KategoriEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KategoriListele();
          }
        });
      }
    });

  }
  Duzenle(kayit: Kategori) {
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: '500px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.kategoriId = kayit.kategoriId;
        this.apiServis.KategoriDuzenle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KategoriListele();
          }
        });
      }
    });
  }

  Sil(kayit: Kategori) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.kategoriAd + " kategorisi silinecektir, emin misiniz ?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KategoriSil(kayit.kategoriId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KategoriListele();
          }
        });
      }
    });
  }
}
