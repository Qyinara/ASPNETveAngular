import { UyeDialogComponent } from './../dialogs/uye-dialog/uye-dialog.component';
import { Kategoriler } from './../../models/Kategoriler';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Uyeler } from 'src/app/models/Uyeler';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{
kadi:string;
uyeler:Uyeler[];
UyeId:number;
uyeId = localStorage.getItem("uid")
yenikayit:Uyeler;
kategoriler: Kategoriler[];
dialogRef: MatDialogRef<UyeDialogComponent>;
dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiServis:ApiService,
    public MatDialog:MatDialog,
    public alert:MyAlertService,
    public route: ActivatedRoute  
    ) {}
  ngOnInit(): void {
    this.KategoriListele();
   if(this.apiServis.oturumKontrol)
   this.kadi = localStorage.getItem("kadi");
  }

  oturumKapat(){
    localStorage.clear();
    location.href = "/"
    
  }

  UyeEkle(){
    var yenikayit:Uyeler = new Uyeler();
    this.dialogRef=this.MatDialog.open(UyeDialogComponent,{
    width:'300px',
    data:{
      kayit: yenikayit,
      islem:'ekle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
  if(d){
    yenikayit = d;
    yenikayit.UyeTarih = new Date();
    yenikayit.UyeId = this.UyeId;
    this.apiServis.UyeEkle(yenikayit).subscribe((s:Sonuc)=>{
      this.alert.AlertUygula(s);

    });
  }
  });
  }

  KategoriListele(){
this.apiServis.KategoriListe().subscribe((d:Kategoriler[]) =>{
this.kategoriler = d;
});

  }
}
