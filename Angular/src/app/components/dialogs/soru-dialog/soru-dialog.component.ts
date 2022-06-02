import { ApiService } from 'src/app/services/api.service';
import { Kategoriler } from './../../../models/Kategoriler';
import { Sorular } from './../../../models/Sorular';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-soru-dialog',
  templateUrl: './soru-dialog.component.html',
  styleUrls: ['./soru-dialog.component.css']
})
export class SoruDialogComponent implements OnInit {

  dialogBaslik:string;
  yeniKayit:Sorular;
  islem:string;
  frm: FormGroup;
  kategoriler:Kategoriler[];
  Jconfig={};
  constructor(
    public dialogRef: MatDialogRef<SoruDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService

  ) {

this.islem = data.islem;
if(this.islem== "ekle"){
  this.dialogBaslik="Soru Ekle";
  this.yeniKayit = new Sorular();
}


if(this.islem== "duzenle"){
  this.dialogBaslik="Soru Düzenle";
  this.yeniKayit = data.kayit;

}

if(this.islem== "detay"){
  this.dialogBaslik="Soru Detay";
  this.yeniKayit = data.kayit;

}


this.frm = this.FormOlustur();

}

  ngOnInit() {
    this.KategoriListele();
  }

  FormOlustur(){

    return this.frmBuild.group({
      SoruBaslik: [this.yeniKayit.SoruBaslik],
      SoruIcerik: [this.yeniKayit.SoruIcerik],
      KategoriId: [this.yeniKayit.KategoriId]
    });
  }

  
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d: Kategoriler[]) =>{

      this.kategoriler = d;

    });

  }

}
