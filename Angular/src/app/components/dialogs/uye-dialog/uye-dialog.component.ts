import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Uyeler } from 'src/app/models/Uyeler';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.scss']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik:string;
  yenikayit:Uyeler;
  islem:string;
  frm:FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    public frmBuild :FormBuilder,
    public apiServis:ApiService,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) { 
    { 
      this.islem=data.islem;
      if(this.islem=="ekle"){
        this.dialogBaslik="Kayıt Ol";
        this.yenikayit = new Uyeler();
      }
      if(this.islem== "duzenle"){
        this.dialogBaslik="Soru Düzenle";
        this.yenikayit = data.kayit;
      
      }
      this.frm = this.FormOlustur();
    }
  }

  ngOnInit() { 
   
  
}
 FormOlustur(){
      return this.frmBuild.group({
        KullaniciAdi: [this.yenikayit.KullaniciAdi],
        UyeMail:  [this.yenikayit.UyeMail],
        UyeParola: [this.yenikayit.UyeParola],
        UyeYetki: [this.yenikayit.UyeYetki],
        UyeTarih: [this.yenikayit.UyeTarih]
      })
    };

}