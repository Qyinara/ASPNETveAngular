import { Yanitlar } from './../../../models/Yanitlar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { SoruDialogComponent } from '../../dialogs/soru-dialog/soru-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-admin-yanitlar',
  templateUrl: './admin-yanitlar.component.html',
  styleUrls: ['./admin-yanitlar.component.scss']
})
export class AdminYanitlarComponent implements OnInit {
  yanitlar: Yanitlar[];

  dataSource: any;
  katId:number;
  UyeId:number;
  displayedColumns=['KullaniciAdi','YanitIcerik','YanitTarih','detay']
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<SoruDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis:ApiService,
    public matDialog : MatDialog,
    public alert: MyAlertService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.YanitListele();
  }

  YanitListele(){
    this.apiServis.YanitListe().subscribe((d:Yanitlar[])=>{
      this.yanitlar=d;
      this.dataSource= new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }


  
  Sil(kayit:Yanitlar){
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.YanitIcerik + " İçerikli Yanıt Silinecektir. Onaylıyor musunuz?";
  
    this.dialogRefConfirm.afterClosed().subscribe(d =>{
      if(d){
        
        this.apiServis.YanitSil(kayit.YanitId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.YanitListele();
            
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
