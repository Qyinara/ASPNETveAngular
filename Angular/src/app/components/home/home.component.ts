import { Sorular } from './../../models/Sorular';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from './../../models/Sonuc';
import { MyAlertService } from './../../services/myAlert.service';
import { Component, OnInit } from '@angular/core';
import { SoruDialogComponent } from '../dialogs/soru-dialog/soru-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sorular: Sorular[];
  UyeId:number;



  dialogRef: MatDialogRef<SoruDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:ApiService,
    public MatDialog:MatDialog,
    public alert:MyAlertService,
    public route: ActivatedRoute

  ) { }

  ngOnInit() {
  this.SonEklenenler();
  this.UyeId = parseInt(localStorage.getItem("uid"));
  }

  SonEklenenler(){
    this.apiServis.SoruListeSonEklenenler(5).subscribe((d:Sorular[])=>{
      this.sorular = d;



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














// constructor içi
// public alert:MyAlertService,
// public matDialog: MatDialog

// üstü
// confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

// AlertAc(p:boolean){
  //   var s: Sonuc = new Sonuc();
  //   s.islem = p;
  //   s.mesaj = "Bu bir alert test mesajıdır";
  //   this.alert.AlertUygula(s);
  // }

  // ConfirmAc(){
  //   this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
  //     width:'400px'
  //   });
  //   this.confirmDialogRef.componentInstance.dialogMesaj= "Kayıt Silinecektir.Onaylıyor musunuz?";
  //   this.confirmDialogRef.afterClosed().subscribe(d=>{
  //     console.log(d);
  //     if(d){
    
        
  //       //silme işlemi
    
        
  //     }
  //   });
  //     }