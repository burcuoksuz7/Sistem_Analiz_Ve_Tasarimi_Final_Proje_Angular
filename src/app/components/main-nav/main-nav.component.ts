import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SepetDialogComponent } from '../dialogs/sepet-dialog/sepet-dialog.component';
import { Urun } from 'src/app/models/Urun';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  sepetDialogRef: MatDialogRef<SepetDialogComponent>;

  sepetUrun: Urun[] 

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,    private matdialog: MatDialog,public router: Router
    ) {    }

  Sepetim(){
    if(localStorage.getItem("uid")){
      this.sepetUrun =JSON.parse(localStorage.getItem("urun"))
      this.sepetDialogRef = this.matdialog.open(SepetDialogComponent, {
        width: "800px",
        data: {
          u: this.sepetUrun
        }
      })
    }
    else{
      this.router.navigate(["girisyap"])
    }

  }

  CikisYap() {
    localStorage.removeItem("uid")
    localStorage.removeItem("yetki")
    this.router.navigate([""])
  }

}
