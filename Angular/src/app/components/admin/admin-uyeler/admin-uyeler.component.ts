import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uyeler } from 'src/app/models/Uyeler';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { UyeDialogComponent } from '../../dialogs/uye-dialog/uye-dialog.component';

@Component({
  selector: 'app-admin-uyeler',
  templateUrl: './admin-uyeler.component.html',
  styleUrls: ['./admin-uyeler.component.scss']
})
export class AdminUyelerComponent implements OnInit {
  uyeler:Uyeler[];
  dataSource:any;
  UyeId:number;
  displayedColumns=['UyeId','UyeTarih','KullaniciAdi','UyeMail','UyeParola','UyeYetki','detay']
  dialogRef:MatDialogRef<UyeDialogComponent>
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort : MatSort; 
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor(
    public apiServis:ApiService,
    public matDialog : MatDialog,
    public alert: MyAlertService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.UyeListele();
  }
  UyeListele(){
    this.apiServis.UyeListe().subscribe((d:Uyeler[])=>{
      this.uyeler=d;
      this.dataSource= new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }
  Ekle(){
    var yenikayit:Uyeler = new Uyeler();
    this.dialogRef=this.matDialog.open(UyeDialogComponent,{
      width:'400px',
      data:{
        kayit:yenikayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        
        yenikayit.KullaniciAdi = d.KullaniciAdi;
        yenikayit.UyeMail= d.UyeMail;
        yenikayit.UyeParola= d.UyeParola;
        yenikayit.UyeYetki= d.UyeYetki;
        yenikayit.UyeTarih = d.UyeTarih;
      
        this.apiServis.UyeEkle(d).subscribe((s:Sonuc)=>{
          console.log(d)
          this.alert.AlertUygula(s);
          if(s.islem){
            this.UyeListele();
          }
        });
      }
    });
  }


   
  Duzenle(kayit:Uyeler){
    this.dialogRef=this.matDialog.open(UyeDialogComponent,{
      width:'400px',
      data:{
        kayit: kayit,
        islem:'duzenle'
      }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if(d){
      kayit.KullaniciAdi = d.KullaniciAdi;
      kayit.UyeMail= d.UyeMail;
      kayit.UyeParola= d.UyeParola;
      kayit.UyeYetki= d.UyeYetki;
      kayit.UyeTarih = d.UyeTarih;
      this.apiServis.UyeDuzenle(kayit).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.UyeListele();
        }
      });
    } 
    });
  } 
  
  
  Sil(uyeler:Uyeler){
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = uyeler.KullaniciAdi + " Adlı Kullanıcı silinecektir. Onaylıyor musunuz?";

    this.dialogRefConfirm.afterClosed().subscribe(d =>{
      if(d){

        uyeler.KullaniciAdi = d.KullaniciAdi;
        uyeler.UyeMail= d.UyeMail;
        uyeler.UyeParola= d.UyeParola;
        uyeler.UyeYetki= d.UyeYetki;
        uyeler.UyeTarih = d.UyeTarih;

        this.apiServis.UyeSil(uyeler.UyeId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.UyeListele();
          }
        });
      } 

    });
  }

  Filtrele(e){
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase()
  }

}
