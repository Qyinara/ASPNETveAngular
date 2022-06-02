import { SoruDialogComponent } from './../../dialogs/soru-dialog/soru-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kategoriler } from 'src/app/models/Kategoriler';
import { Sonuc } from 'src/app/models/Sonuc';
import { Sorular } from 'src/app/models/Sorular';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { KategoriDialogComponent } from '../../dialogs/kategori-dialog/kategori-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-sorular',
  templateUrl: './admin-sorular.component.html',
  styleUrls: ['./admin-sorular.component.scss']
})
export class AdminSorularComponent implements OnInit {
  kategoriler: Kategoriler[];
  secKat:Kategoriler;
  sorular: Sorular[];
  dataSource: any;
  katId:number;
  UyeId:number;
  displayedColumns=['UyeKadi','SoruBaslik','SoruTarih','detay']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<SoruDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  
    constructor(  
      public apiServis: ApiService,
      public MatDialog:MatDialog,
      public alert:MyAlertService,
      public route: ActivatedRoute

  
    ) { }
  
    ngOnInit() {
      this.KategoriListele();
      this.UyeId = parseInt(localStorage.getItem("uid"));
      this.route.params.subscribe(p=>{
        if(p.katId){
          
          this.katId = p.katId;
          this.KategoriById();
        }

      });
    }
    KategoriById(){
      this.apiServis.KategoriById(this.katId).subscribe((d:Kategoriler)=>{
        this.secKat = d;
        this.SoruListe();
      });

    }
  
    SoruListe(){
      this.apiServis.SoruListeByKatId(this.katId).subscribe((d: Sorular[]) =>{
  
        this.sorular = d;
        this.dataSource = new MatTableDataSource(d);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  
    }

    KategoriListele(){
      this.apiServis.KategoriListe().subscribe((d: Kategoriler[]) =>{
  
        this.kategoriler = d;

      });
  
    }

    KategoriSec(kat: Kategoriler){
    
      this.katId = kat.KategoriId;
      this.SoruListe();

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
        if(s.islem){
          this.SoruListe();
        }
      });
    }
    });
    }
    
  
    Duzenle(kayit:Sorular){
      this.dialogRef=this.MatDialog.open(SoruDialogComponent,{
        width:'800px',
        data:{
          kayit: kayit,
          islem:'duzenle'
        }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
  
        console.log(d);
        this.apiServis.SoruDuzenle(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.SoruListe();
          }
        });
      } 
      });
    }



    Detay(kayit:Sorular){
      this.dialogRef=this.MatDialog.open(SoruDialogComponent,{
        width:'800px',
        data:{
          kayit: kayit,
          islem:'detay'
        }
    }); 
    
    } 
  
  
  
  
    Sil(kayit:Sorular){
      this.dialogRefConfirm = this.MatDialog.open(ConfirmDialogComponent,{
        width:'400px'
      });
      this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.SoruBaslik + " Başlıklı Soru Silinecektir. Onaylıyor musunuz?";
    
      this.dialogRefConfirm.afterClosed().subscribe(d =>{
        if(d){
          
          this.apiServis.SoruSil(kayit.SoruId).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if(s.islem){
              this.SoruListe();
              
            }
          });
        } 
      
      });
    }
}
