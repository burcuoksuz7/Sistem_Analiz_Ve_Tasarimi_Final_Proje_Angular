
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Urun } from 'src/app/models/Urun';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-urunsec-dialog',
  templateUrl: './urunsec-dialog.component.html',
  styleUrls: ['./urunsec-dialog.component.css']
})
export class UrunsecDialogComponent implements OnInit {
  urunler: Urun[];

  dataSource: any;
  displayedColumns = ['urunAd', 'urunFiyat', 'urunAciklama', 'urunKatId', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public dialogRef: MatDialogRef<UrunsecDialogComponent>
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
  UrunSec(urun: Urun) {
    this.dialogRef.close(urun);
  }

}
