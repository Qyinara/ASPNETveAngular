import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Kategoriler } from '../models/Kategoriler';
import { Uyeler } from '../models/Uyeler';
import { Sorular } from '../models/Sorular';
import { Yanitlar } from '../models/Yanitlar';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
apiUrl = "http://localhost:62906/api/";
constructor(
  public http:HttpClient
) { }



//OTURUM API BAŞLANGIÇ
tokenAl(kadi: string, parola: string){
  var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
  var reqHeader = new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"});
  return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader});

}

oturumKontrol(){

  if (localStorage.getItem("token")){
    return true;
  }else{
    return false;
  }
}

yetkiKontrol(yetkiler){

  var sonuc:boolean=false;

  var uyeYetkiler : string[]= JSON.parse(localStorage.getItem("uyeYetkileri"));
  if(uyeYetkiler){
    yetkiler.forEach(element => {
      if(uyeYetkiler.indexOf(element)> -1){
        sonuc = true;
        return false;
      }
    });
  }
  return sonuc;
  
}



//OTURUM API BİTİŞ



//KATEGORİ API BAŞLANGIÇ
KategoriListe(){
  return this.http.get(this.apiUrl + "/kategoriliste");
}

KategoriById(katId: number){
  return this.http.get(this.apiUrl + "/kategoribyid/" + katId);
}

KategoriEkle(kategoriler: Kategoriler){
  return this.http.post(this.apiUrl + "/kategoriekle", kategoriler);
}

KategoriDuzenle(kategoriler:Kategoriler){
  return this.http.put(this.apiUrl + "/kategoriduzenle",kategoriler);
}

KategoriSil(katId:number){
  return this.http.delete(this.apiUrl + "/kategorisil/" + katId);
}

//KATEGORİ API BİTİŞ

//SORULAR API BAŞLANGIÇ

SoruListe(){
  return this.http.get(this.apiUrl + "/soruliste");
}

SorularById(SoruId: number){
  return this.http.get(this.apiUrl + "/sorubyid/" + SoruId);
}


SoruListeSonEklenenler(s: number){
return this.http.get(this.apiUrl + "/sorulistesoneklenenler/"+ s);
}

SoruListeByKatId(katId:number){
return this.http.get(this.apiUrl + "/sorulistebykatid/" + katId);
}

SoruListeByUyeId(UyeId:number){
  return this.http.get(this.apiUrl + "/sorulistebyuyeid/" + UyeId);
  }
  

SoruEkle(soru: Sorular){
  return this.http.post(this.apiUrl + "/soruekle", soru);
}

SoruDuzenle(Sorular: Sorular){
  return this.http.put(this.apiUrl + "/soruduzenle",Sorular);
}

SoruSil(UyeId:number){
  return this.http.delete(this.apiUrl + "/sorusil/" + UyeId);
}


//SORULAR API BİTİŞ






//YANITLAR API BAŞLANGIÇ

YanitListe(){
  return this.http.get(this.apiUrl + "/yanitliste");
}

YanitListeByUyeId(uyeId: number){
  return this.http.get(this.apiUrl + "/yanitbyuyeid/" + uyeId);
}

YanitListeBySoruId(soruId: number){
  return this.http.get(this.apiUrl + "/yanitlistebysoruid/" + soruId);
}

YanitListeSonEklenenler(s: number){
  return this.http.get(this.apiUrl + "/yanitliste/" + s);
}

YanitById(yanitId: number){
  return this.http.get(this.apiUrl + "/yanitbyid/" + yanitId);
}

YanitEkle(yanit: Yanitlar){
  return this.http.post(this.apiUrl + "/yanitekle", yanit);
}

YanitDuzenle(yanit: Yanitlar){
  return this.http.put(this.apiUrl + "/yanitduzenle",yanit);
}

YanitSil(Yanitid:number){
  return this.http.delete(this.apiUrl + "/yanitsil/" + Yanitid);
}

//YANITLAR API BİTİŞ






//ÜYE API BAŞLANGIÇ

UyeListe(){
  return this.http.get(this.apiUrl + "/uyeliste");
}


UyeById(uyeId:number){
  return this.http.get(this.apiUrl + "/uyebyid/"+uyeId);

}

UyeEkle(uyeler:Uyeler){
  return this.http.post(this.apiUrl + "/uyeekle",uyeler);
}

UyeDuzenle(uyeler:Uyeler){
  return this.http.put(this.apiUrl + "/uyeduzenle",uyeler);
}

UyeSil(uyeId:number){
  return this.http.delete(this.apiUrl + "/uyesil/"+ uyeId);

}
//ÜYE API BİTİŞ
}
