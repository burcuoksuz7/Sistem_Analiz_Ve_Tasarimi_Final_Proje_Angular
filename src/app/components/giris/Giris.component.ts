import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Yonetici } from 'src/app/models/Yonetici';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-Giris',
  templateUrl: './Giris.component.html',
  styleUrls: ['./Giris.component.scss']
})
export class GirisComponent implements OnInit {
  girisyonetici: Yonetici;
  form: FormGroup;

  constructor(
    public service: ApiService,
    public router: Router,
    public formBuilder: FormBuilder
  ) {
    this.girisyonetici = new Yonetici();
    this.form = this.yoneticiForm()
  }



  ngOnInit() {
  }

  yoneticiForm() {
    return this.formBuilder.group({
      yoneticiAd: [this.girisyonetici.yoneticiAd, [Validators.required]],
      yoneticiSifre: [this.girisyonetici.yoneticiSifre, [Validators.required]]
    });

  }

  girisYap(yonetici) {
    console.log(yonetici)
    this.service.girisYap(yonetici.yoneticiAd, yonetici.yoneticiSifre).subscribe((yonetici: Yonetici) => {
      if(yonetici!=null){
        this.girisyonetici = yonetici;
        localStorage.setItem("yetki",yonetici.yoneticiYetki);
        localStorage.setItem("uid",yonetici.yoneticiId.toString());
        this.router.navigate([''])
      }


    })

  }

}

