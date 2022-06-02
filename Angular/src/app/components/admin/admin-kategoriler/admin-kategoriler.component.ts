import { ConfirmDialogComponent } from './../../dialogs/confirm-dialog/confirm-dialog.component';
import { KategoriDialogComponent } from './../../dialogs/kategori-dialog/kategori-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Kategoriler } from './../../../models/Kategoriler';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatDialog } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-kategoriler',
  templateUrl: './admin-kategoriler.component.html',
  styleUrls: ['./admin-kategoriler.component.scss']
})
export class AdminKategorilerComponent implements OnInit {
kategoriler: Kategoriler[];
dataSource: any;
displayedColumns=['KategoriAdi','KatSoruSay','detay']
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
dialogRef: MatDialogRef<KategoriDialogComponent>;
dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public MatDialog:MatDialog,
    public alert:MyAlertService

  ) { }

  ngOnInit() {
    this.KategoriListele();
  }

  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d: Kategoriler[]) =>{

      this.kategoriler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }
  Ekle(){
    var yenikayit:Kategoriler = new Kategoriler();
    this.dialogRef=this.MatDialog.open(KategoriDialogComponent,{
    width:'300px',
    data:{
      kayit: yenikayit,
      islem:'ekle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
  if(d){
    this.apiServis.KategoriEkle(d).subscribe((s:Sonuc)=>{
      this.alert.AlertUygula(s);
      if(s.islem){
        this.KategoriListele();
      }
    });
  }
  });
  }
  

  Duzenle(kayit:Kategoriler){
    this.dialogRef=this.MatDialog.open(KategoriDialogComponent,{
      width:'400px',
      data:{
        kayit: kayit,
        islem:'duzenle'
      }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if(d){
      kayit.KategoriAdi = d.KategoriAdi;
      console.log(d);
      this.apiServis.KategoriDuzenle(kayit).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.KategoriListele();
        }
      });
    } 
    });
  }



  Sil(kayit:Kategoriler){
    this.dialogRefConfirm = this.MatDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.KategoriAdi + " Adlı kategori silinecektir. Onaylıyor musunuz?";
  
    this.dialogRefConfirm.afterClosed().subscribe(d =>{
      if(d){
        kayit.KategoriAdi = d.KategoriAdi;
        this.apiServis.KategoriSil(kayit.KategoriId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KategoriListele();
            
          }
        });
      } 
    
    });
  }
}
