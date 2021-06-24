import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from './../../models/Sonuc';
import { MyAlertService } from './../../services/myAlert.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { Urun } from 'src/app/models/Urun';
import { SepetDialogComponent } from '../dialogs/sepet-dialog/sepet-dialog.component';
import { Sepet } from 'src/app/models/Sepet';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  urunler: Urun[];
  sepetUrun: Urun[] = [];
  sepet: Sepet;

  sepetDialogRef: MatDialogRef<SepetDialogComponent>;

  constructor(
    private servis: ApiService,
    private matdialog: MatDialog,
    private alert: MyAlertService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.UrunListele();
  }

  UrunListele() {
    this.servis.UrunListe().subscribe((d: Urun[]) => {
      this.urunler = d;
    })
  }

  SepeteEkle(urun: Urun) {
    if (urun) {
      this.sepetUrun.push(urun)
      localStorage.setItem("urun", JSON.stringify(this.sepetUrun))
      this.toastr.success("Ürün sepete eklenmiştir.")
      this.sepetDialogRef = this.matdialog.open(SepetDialogComponent, {
        width: "800px",
        data: {
          u: this.sepetUrun
        }
      })
    }

  }

}
