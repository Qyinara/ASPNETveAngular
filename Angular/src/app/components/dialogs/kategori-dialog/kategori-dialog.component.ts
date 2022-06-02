import { Kategoriler } from './../../../models/Kategoriler';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-kategori-dialog',
  templateUrl: './kategori-dialog.component.html',
  styleUrls: ['./kategori-dialog.component.scss']
})
export class KategoriDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit:Kategoriler;
  islem:string;
  frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<KategoriDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {

this.islem = data.islem;
if(this.islem== "ekle"){
  this.dialogBaslik="Kategori Ekle";
  this.yeniKayit = new Kategoriler();
}


if(this.islem== "duzenle"){
  this.dialogBaslik="Kategori Duzenle";
  this.yeniKayit = data.kayit;

}
this.frm = this.FormOlustur();

}

  ngOnInit() {
  }

  FormOlustur(){

    return this.frmBuild.group({
      KategoriAdi: [this.yeniKayit.KategoriAdi]

    });
  }

}
