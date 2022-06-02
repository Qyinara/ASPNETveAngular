import { Kategoriler } from './../../models/Kategoriler';
import { Sorular } from './../../models/Sorular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { SoruDialogComponent } from '../dialogs/soru-dialog/soru-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-kategoriler',
  templateUrl: './kategoriler.component.html',
  styleUrls: ['./kategoriler.component.css']
})
export class KategorilerComponent implements OnInit {

UyeId:number;
sorular:Sorular[];
katId:number;
kat: Kategoriler;
dialogRef: MatDialogRef<SoruDialogComponent>;
dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
constructor(
  public apiServis:ApiService,
  public MatDialog:MatDialog,
  public alert:MyAlertService,
  public route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.route.params.subscribe(p =>{
      if (p.katId) {
        this.katId = p.katId;
        this.KategoriById()
        this.SoruListeByKatId();
        
      }

    });
    this.UyeId = parseInt(localStorage.getItem("uid"));
  }


  KategoriById(){
    this.apiServis.KategoriById(this.katId).subscribe((d: Kategoriler)=>{
      this.kat = d;
    });
  }


  SoruListeByKatId(){
    this.apiServis.SoruListeByKatId(this.katId).subscribe((d:Sorular[])=>{
      this.sorular= d;
 
    });
  }

  Ekle(){
    var yenikayit:Sorular = new Sorular();
    this.dialogRef=this.MatDialog.open(SoruDialogComponent,{
    width:'800px',
    data:{
      kayit: yenikayit,
      islem:'ekle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
  if(d){
    yenikayit = d;
    yenikayit.SoruTarih = new Date();
    yenikayit.UyeId = this.UyeId;
    this.apiServis.SoruEkle(yenikayit).subscribe((s:Sonuc)=>{
      this.alert.AlertUygula(s);

    });
  }
  });
  }

}
