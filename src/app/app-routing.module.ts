import { UrunlisteComponent } from './components/urunliste/urunliste.component';
import { KategorilisteComponent } from './components/kategoriliste/kategoriliste.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { UrunComponent } from './components/urun/urun.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GirisComponent } from './components/giris/Giris.component';
import { AdminGuard } from './admin.guards.service';
import { YoneticiComponent } from './components/yonetici/yonetici.component';
import { YoneticiGuard } from './services/yonetici.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'urun',
    component: UrunComponent, canActivate: [YoneticiGuard]
  },
  {
    path: 'yoneticiler',canActivate: [YoneticiGuard],
    component: YoneticiComponent
  },
  {
    path: 'kategori',
    component: KategoriComponent, canActivate: [YoneticiGuard]
  },
  {
    path: 'kategorilistele/:urunId',
    component: KategorilisteComponent, canActivate: [YoneticiGuard]
  },
  {
    path: 'urunlistele/:kategoriId',
    component: UrunlisteComponent, canActivate: [YoneticiGuard]
  },
  {
    path: "girisyap",
    component: GirisComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
