import { Yanitlar } from './../../models/Yanitlar';
import { Sorular } from './../../models/Sorular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { SoruDialogComponent } from '../dialogs/soru-dialog/soru-dialog.component';


@Component({
  selector: 'app-sorular',
  templateUrl: './sorular.component.html',
  styleUrls: ['./sorular.component.css']
})
export class SorularComponent implements OnInit {
  soruId:number;
  sorular: Sorular;
  yanitlar: Yanitlar[];
  dialogRef: MatDialogRef<SoruDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public route:ActivatedRoute,
    public matDialog : MatDialog,
    public alert: MyAlertService,

   
  ) { }

  ngOnInit() {  
    this.route.params.subscribe(p =>{
      if (p.soruId) {
        this.soruId = p.soruId;
        this.SorularbyId();
        this.SoruYanitListe();        
      }

    });
  }


  SoruYanitListe(){
    this.apiServis.YanitListeBySoruId(this.soruId).subscribe((d:Yanitlar[])=>{
      this.yanitlar = d;
      console.log(d);
    });

  }

  SorularbyId(){
    this.apiServis.SorularById(this.soruId).subscribe((d:Sorular)=>{
      this.sorular=d;


    });

  }



  YanitEkle(yanitMetni:string){
    var yanitlar: Yanitlar = new Yanitlar();
    var UyeId : number = parseInt(localStorage.getItem("uid"));
    yanitlar.SoruId = this.soruId;
    yanitlar.UyeId = UyeId;
    yanitlar.YanitIcerik = yanitMetni;
    yanitlar.YanitTarih = new Date();
    
    

    this.apiServis.YanitEkle(yanitlar).subscribe((d:Sonuc)=>{
      if (d.islem) {
        this.SoruYanitListe();
        console.log(d);
      }
      
    });


}
}