import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Sonuc } from 'src/app/Models/Sonuc';
import { Yonetici } from 'src/app/models/Yonetici';
import { ApiService } from 'src/app/services/api.service';
import { YoneticiDialogComponent } from '../Dialogs/yonetici-dialog/yonetici-dialog.component';


@Component({
  selector: 'app-yonetici',
  templateUrl: './yonetici.component.html',
  styleUrls: ['./yonetici.component.scss']
})

export class YoneticiComponent implements OnInit {

  displayedColumns: string[] = ['yoneticiAd','yoneticiSifre','yoneticiYetki','Duzenle', 'Sil'];
  dataSource: any;

  uyedialogref: MatDialogRef<YoneticiDialogComponent>
  uye: Yonetici;

  constructor(public service: ApiService, public matdialog: MatDialog, public toastr: ToastrService) 
  { 

  }

  ngOnInit() {
    this.yoneticiliste();
  }

  yoneticiliste() {
    this.service.yoneticiliste().subscribe((veri: Yonetici[]) => {
      this.dataSource = new MatTableDataSource(veri);
    })
  }


  yoneticiekle() {
    this.uye = new Yonetici();
    this.uyedialogref = this.matdialog.open(YoneticiDialogComponent, {
      width: "300px",
      data: {
        kayit: this.uye,
        islem: "ekle"
      }
    })

    this.uyedialogref.afterClosed().subscribe((veri: Yonetici) => {
      if (veri) {
        this.uye.yoneticiAd=veri.yoneticiAd;
        this.uye.yoneticiSifre=veri.yoneticiSifre;
        this.uye.yoneticiYetki="A";

        this.service.yoneticiekle(this.uye).subscribe((sonuc: Sonuc) => {
          if (sonuc.islem == true) {
            this.toastr.success(sonuc.mesaj);
            this.yoneticiliste()
          } else {
            this.toastr.success(sonuc.mesaj);
            this.yoneticiliste()
          }
        })
      }
    })

  }


  yoneticiduzenle(kayit: Yonetici) {
    this.uyedialogref = this.matdialog.open(YoneticiDialogComponent, {
      width: "300px",
      data: {
        kayit: kayit,
        islem: "duzenle"
      }
    })

    this.uyedialogref.afterClosed().subscribe(d => {
      if (d) {

        kayit.yoneticiAd = d.yoneticiAd;
        kayit.yoneticiSifre = d.yoneticiSifre;
        kayit.yoneticiYetki="A";
       
        console.log(kayit)

        this.service.yoneticiduzenle(kayit).subscribe((s: Sonuc) => {
          this.dataSource.AlertUygula(s);
          if (s.islem) {
            this.yoneticiliste();
          }
          else{
            this.yoneticiliste();

          }
        })
      }
    });
  }

  yoneticisil(yoneticiId) {
    this.service.yoneticisil(yoneticiId).subscribe((sonuc: Sonuc) => {
      this.toastr.success(sonuc.mesaj);
      this.yoneticiliste();
    })
  }
}
