import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kategori } from 'src/app/Models/Kategori';
import { Yonetici } from 'src/app/models/Yonetici';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-yonetici-dialog',
  templateUrl: './yonetici-dialog.component.html',
  styleUrls: ['./yonetici-dialog.component.scss']
})

export class YoneticiDialogComponent implements OnInit {

  yonetici: Yonetici;

  kategoriler: Kategori[];

  form: FormGroup;

  dialogBaslik: string;

  islem: string;

  constructor(

    public formBuilder: FormBuilder,
    public service: ApiService,
    public dialogRef: MatDialogRef<YoneticiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {

    this.islem = data.islem;
    this.yonetici = data.kayit;

    if (this.islem == "ekle") {
      this.dialogBaslik = "Yönetici Ekle"
    } else {
      this.dialogBaslik = "Yönetici Düzenle"
    }
    this.form = this.yoneticiForm();

  }

  yoneticiForm() {
    return this.formBuilder.group({
      yoneticiAd: [this.yonetici.yoneticiAd, [Validators.required]],
      yoneticiSifre: [this.yonetici.yoneticiSifre, [Validators.required]]
    });

  }

  ngOnInit() {
  }

}
