import { Uyeler } from './../../models/Uyeler';
import { Sorular } from 'src/app/models/Sorular';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-uyesorular',
  templateUrl: './uyesorular.component.html',
  styleUrls: ['./uyesorular.component.css']
})
export class UyesorularComponent implements OnInit {
  sorular:Sorular[];
  UyeId:number;
  uye: Uyeler;
    constructor(
      public apiServis: ApiService,
      public route:ActivatedRoute
    ) { }
  
    ngOnInit() {
      this.route.params.subscribe(p =>{
        if (p.UyeId) {
          this.UyeId = p.UyeId;
          this.UyeById()
          this.SoruListeByUyeId();
          
        }
  
      });
    }
  
  
    UyeById(){
      this.apiServis.UyeById(this.UyeId).subscribe((d: Uyeler)=>{
        this.uye = d;
      });
    }
  
  
    SoruListeByUyeId(){
      this.apiServis.SoruListeByUyeId(this.UyeId).subscribe((d:Sorular[])=>{
        this.sorular= d;
   
      });
    }
}
