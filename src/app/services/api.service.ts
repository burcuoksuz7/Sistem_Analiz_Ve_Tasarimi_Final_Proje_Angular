import { UrunFoto } from '../models/UrunFoto';
import { Kayit } from './../models/Kayit';
import { Kategori } from '../models/Kategori';
import { Urun } from '../models/Urun';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sepet } from '../models/Sepet';
import { Yonetici } from '../models/Yonetici';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "https://localhost:44307/api/";
  siteUrl = "https://localhost:44307/";
  constructor(
    public http: HttpClient
  ) { }

  UrunListe() {
    return this.http.get(this.apiUrl + "urunliste");
  }
  UrunListeById(kategoriId: number) {
    return this.http.get(this.apiUrl + "urunlistebykatid/" + kategoriId);
  }
  UrunById(urunId: number) {
    return this.http.get(this.apiUrl + "urunbyid/" + urunId);
  }
  UrunEkle(urun: Urun) {
    return this.http.post(this.apiUrl + "urunekle", urun);
  }
  UrunDuzenle(urun: Urun) {
    return this.http.put(this.apiUrl + "urunduzenle", urun);
  }
  UrunSil(urunId: number) {
    return this.http.delete(this.apiUrl + "urunsil/" + urunId);
  }
  UrunFotoGuncelle(urunfoto: UrunFoto) {
    return this.http.post(this.apiUrl + "urunfotoguncelle", urunfoto);
  }
  KategoriListe() {
    return this.http.get(this.apiUrl + "kategoriliste");
  }
  KategoriById(kategoriId: number) {
    return this.http.get(this.apiUrl + "kategoribyid/" + kategoriId);
  }
  KategoriEkle(kategori: Kategori) {
    return this.http.post(this.apiUrl + "kategoriekle", kategori);
  }
  KategoriDuzenle(kategori: Kategori) {
    return this.http.put(this.apiUrl + "kategoriduzenle", kategori);
  }
  KategoriSil(kategoriId: number) {
    return this.http.delete(this.apiUrl + "kategorisil/" + kategoriId);
  }

  UrunKategoriListe(urunId: number) {
    return this.http.get(this.apiUrl + "urunkategoriliste/" + urunId);
  }
  KategoriUrunListe(kategoriId: number) {
    return this.http.get(this.apiUrl + "kategoriurunliste/" + kategoriId);
  }
  KayitEkle(kayit: Kayit) {
    return this.http.post(this.apiUrl + "kayitekle", kayit);
  }
  KayitSil(kayitId: number) {
    return this.http.delete(this.apiUrl + "kayitsil/" + kayitId);
  }

  SepetEkle(sepet:Sepet){
    return this.http.post(this.apiUrl + "sepetekle", sepet);
  }

  yoneticiliste(){
    return this.http.get(this.apiUrl+"yoneticiliste");
  
  }


  yoneticibyid(yoneticiId:number){

    return this.http.get(this.apiUrl+"yoneticibyid/"+ yoneticiId);
  
  }
  
  yoneticiekle(yonetici:Yonetici){
    return this.http.post(this.apiUrl+"yoneticiekle",yonetici);
  
  }
  
  yoneticiduzenle(yonetici:Yonetici){
    return this.http.put(this.apiUrl+"yoneticiduzenle",yonetici);
  
  }
  
  yoneticisil(yoneticiId:number){
    return this.http.delete(this.apiUrl+"yoneticisil/"+yoneticiId);
  }

  girisYap(yoneticiAd: string, yoneticiSifre: string) {
    return this.http.get(this.apiUrl + "girisyap/" + yoneticiAd + "/" + yoneticiSifre)
  }
}
