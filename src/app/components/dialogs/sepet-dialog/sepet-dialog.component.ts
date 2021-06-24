import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Urun } from 'src/app/models/Urun';

@Component({
  selector: 'app-sepet-dialog',
  templateUrl: './sepet-dialog.component.html',
  styleUrls: ['./sepet-dialog.component.scss']
})
export class SepetDialogComponent implements OnInit {

  urunler:Urun[];
  constructor(
    public dialogRef: MatDialogRef<SepetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.urunler=data.u;
  }

  ngOnInit() {
  }

}
