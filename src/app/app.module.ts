import { UrunsecDialogComponent } from './components/dialogs/urunsec-dialog/urunsec-dialog.component';
import { UrunlisteComponent } from './components/urunliste/urunliste.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { FotoyukleDialogComponent } from './components/dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { KategorilisteComponent } from './components/kategoriliste/kategoriliste.component';
import { MyAlertService } from './services/myAlert.service';
import { ApiService } from './services/api.service';
import { KategoriComponent } from './components/kategori/kategori.component';
import { UrunComponent } from './components/urun/urun.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UrunDialogComponent } from './components/dialogs/urun-dialog/urun-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SepetDialogComponent } from './components/dialogs/sepet-dialog/sepet-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { GirisComponent } from './components/giris/Giris.component';
import { YoneticiComponent } from './components/yonetici/yonetici.component';
import { YoneticiDialogComponent } from './components/Dialogs/yonetici-dialog/yonetici-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    UrunComponent,
    KategoriComponent,
    KategorilisteComponent,
    UrunlisteComponent,
    GirisComponent,
    YoneticiComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    UrunDialogComponent,
    FotoyukleDialogComponent,
    KategoriDialogComponent,
    UrunsecDialogComponent,
    SepetDialogComponent,
    YoneticiDialogComponent
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    UrunDialogComponent,
    FotoyukleDialogComponent,
    KategoriDialogComponent,
    UrunsecDialogComponent
  ],
  providers: [ApiService, MyAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
