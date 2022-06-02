using AngularFinali.Models;
using AngularFinali.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AngularFinali.Controllers
{

    public class ServisController : ApiController
    {
        DB07Entities db = new DB07Entities();
        SonucModel sonuc = new SonucModel();


        #region Kategori


        [HttpGet]
        [Route("api/kategoriliste")]
        public List<KategorilerModel> KategoriListe()
        {
            List<KategorilerModel> liste = db.Kategoriler.Select(x => new KategorilerModel()
            {
                KategoriId = x.KategoriId,
                KategoriAdi = x.KategoriAdi,
                KatSoruSay = x.Sorular.Count

            }).ToList();
            return liste;

        }

        [HttpGet]
        [Route("api/kategoribyid/{katId}")]
        public KategorilerModel KategoriById(int katId)
        {
            KategorilerModel kayit = db.Kategoriler.Where(s => s.KategoriId == katId).Select(x =>
            new KategorilerModel()
            {
                KategoriId = x.KategoriId,
                KategoriAdi = x.KategoriAdi,
                KatSoruSay = x.Sorular.Count

            }).SingleOrDefault();
            return kayit;
        }


        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoiEkle(KategorilerModel model)
        {
            if (db.Kategoriler.Count(s => s.KategoriAdi == model.KategoriAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kategori Adı Kayıtlıdır.";
                return sonuc;
            }
            Kategoriler yeni = new Kategoriler();
            yeni.KategoriAdi = model.KategoriAdi;
            db.Kategoriler.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Eklendi";
            return sonuc;

        }


        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategorilerModel model)
        {
            Kategoriler kayit = db.Kategoriler.Where(s => s.KategoriId ==
            model.KategoriId).FirstOrDefault();

            if (kayit == null)
            {

                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;

            }
            kayit.KategoriAdi = model.KategoriAdi;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Düzenlendi";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/kategorisil/{katId}")]
        public SonucModel KategoriSil(int katId)
        {
            Kategoriler kayit = db.Kategoriler.Where(s => s.KategoriId == katId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;

            }
            if (db.Sorular.Count(s => s.KategoriId == katId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Soru Kayıtlı Kategori Silinemez!";
                return sonuc;
            }
            db.Kategoriler.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi";
            return sonuc;
        }

        #endregion


        #region Sorular
        [HttpGet]
        [Route("api/soruliste")]
        public List<SorularModel> SoruListe()
        {
            List<SorularModel> liste = db.Sorular.Select(x => new SorularModel()
            {
                SoruId = x.SoruId,
                SoruBaslik = x.SoruBaslik,
                SoruIcerik = x.SoruIcerik,
                SoruTarih = x.SoruTarih,
                KategoriId = x.KategoriId,
                KategoriAdi = x.Kategoriler.KategoriAdi,
                UyeId = x.UyeId,
                UyeKadi = x.Uyeler.KullaniciAdi



            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/sorulistebykatid/{katId}")]
        public List<SorularModel> SoruListeByKatId(int katId)
        {
            List<SorularModel> liste = db.Sorular.Where(s => s.KategoriId == katId).Select(x => new SorularModel()
            {
                SoruId = x.SoruId,
                SoruBaslik = x.SoruBaslik,
                SoruIcerik = x.SoruIcerik,
                SoruTarih = x.SoruTarih,
                KategoriId = x.KategoriId,
                KategoriAdi = x.Kategoriler.KategoriAdi,
                UyeId = x.UyeId,
                UyeKadi = x.Uyeler.KullaniciAdi



            }).ToList();
            return liste;
        }




        [HttpGet]
        [Route("api/sorulistebyuyeid/{uyeId}")]
        public List<SorularModel> SoruListeByUyeId(int UyeId)
        {
            List<SorularModel> liste = db.Sorular.Where(s => s.UyeId == UyeId).Select(x => new SorularModel()
            {
                SoruId = x.SoruId,
                SoruBaslik = x.SoruBaslik,
                SoruIcerik = x.SoruIcerik,
                SoruTarih = x.SoruTarih,
                KategoriId = x.KategoriId,
                KategoriAdi = x.Kategoriler.KategoriAdi,
                UyeId = x.UyeId,
                UyeKadi = x.Uyeler.KullaniciAdi



            }).ToList();
            return liste;
        }


        [HttpGet]
        [Route("api/sorubyid/{SoruId}")]
        public SorularModel SorularbyId(int SoruId)
        {
            SorularModel kayit = db.Sorular.Where(s => s.SoruId == SoruId).Select(x => new SorularModel()
            {
                SoruId = x.SoruId,
                SoruBaslik = x.SoruBaslik,
                SoruIcerik = x.SoruIcerik,
                SoruTarih = x.SoruTarih,
                KategoriId = x.KategoriId,
                KategoriAdi = x.Kategoriler.KategoriAdi,
                UyeId = x.UyeId,
                UyeKadi = x.Uyeler.KullaniciAdi

            }).SingleOrDefault();
            return kayit;
        }


        [HttpPost]
        [Route("api/soruekle")]
        public SonucModel SoruEkle(SorularModel model)
        {
            if (db.Sorular.Count(s => s.SoruBaslik == model.SoruBaslik) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girien Soru Başlığı Kayıtlıdır!";
                return sonuc;
            }


            Sorular yeni = new Sorular();
            yeni.SoruBaslik = model.SoruBaslik;
            yeni.SoruIcerik = model.SoruIcerik;
            yeni.SoruTarih = model.SoruTarih;
            yeni.KategoriId = model.KategoriId;
            yeni.UyeId = model.UyeId;
            db.Sorular.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Soru Eklendi";
            return sonuc;
        }


        [HttpPut]
        [Route("api/soruduzenle")]
        public SonucModel SoruDuzenle(SorularModel model)
        {

            Sorular kayit = db.Sorular.Where(s => s.SoruId == model.SoruId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }

            kayit.SoruBaslik = model.SoruBaslik;
            kayit.SoruIcerik = model.SoruIcerik;
            kayit.SoruTarih = model.SoruTarih;
            kayit.KategoriId = model.KategoriId;
            kayit.UyeId = model.UyeId;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Soru Düzenlendi";
            return sonuc;

        }

        [HttpDelete]
        [Route("api/sorusil/{soruId}")]
        public SonucModel SoruSil(int soruId)
        {
            Sorular kayit = db.Sorular.Where(s => s.SoruId == soruId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            if (db.Yanitlar.Count(s => s.SoruId == soruId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Yanıt Kaydı Olan Soru Silinemez";
                return sonuc;
            }
            db.Sorular.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Soru Silindi";

            return sonuc;

        }


        [HttpGet]
        [Route("api/sorulistesoneklenenler/{s}")]
        public List<SorularModel> SoruListeSonEklenenler(int s)
        {
            List<SorularModel> liste = db.Sorular.OrderByDescending(o => o.SoruTarih).Take(s).Select(x => new SorularModel()
            {
                SoruId = x.SoruId,
                SoruBaslik = x.SoruBaslik,
                SoruIcerik = x.SoruIcerik,
                SoruTarih = x.SoruTarih,
                KategoriId = x.KategoriId,
                KategoriAdi = x.Kategoriler.KategoriAdi,
                UyeId = x.UyeId,
                UyeKadi = x.Uyeler.KullaniciAdi



            }).ToList();
            return liste;
        }

        #endregion


        #region Uye
        [HttpGet]
        [Route("api/uyeliste")]
        public List<UyelerModel> UyeListe()
        {
            List<UyelerModel> liste = db.Uyeler.Select(x => new UyelerModel()
            {


                UyeId = x.UyeId,
                KullaniciAdi = x.KullaniciAdi,
                UyeMail = x.UyeMail,
                UyeParola = x.UyeParola,
                UyeTarih = x.UyeTarih,
                UyeYetki = x.UyeYetki
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/uyebyid/{uyeId}")]
        public UyelerModel UyeById(int uyeId)
        {
            UyelerModel kayit = db.Uyeler.Where(s => s.UyeId == uyeId).Select(x => new UyelerModel()
            {
                UyeId = x.UyeId,
                KullaniciAdi = x.KullaniciAdi,
                UyeMail = x.UyeMail,
                UyeParola = x.UyeParola,
                UyeTarih = x.UyeTarih,
                UyeYetki = x.UyeYetki

            }).SingleOrDefault();
            return kayit;
        }


        [HttpPost]
        [Route("api/uyeekle")]

        public SonucModel UyeEkle(UyelerModel model)
        {
            if (db.Uyeler.Count(s => s.KullaniciAdi == model.KullaniciAdi || s.UyeMail == model.UyeMail) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kullanıcı Adı veya E-posta Kayıtlıdır.";
                return sonuc;
            }
            Uyeler yeni = new Uyeler();
            yeni.KullaniciAdi = model.KullaniciAdi;
            yeni.UyeMail = model.UyeMail;
            yeni.UyeParola = model.UyeParola;
            yeni.UyeTarih = model.UyeTarih;
            yeni.UyeYetki = model.UyeYetki;

            db.Uyeler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Başarıyla Kayıt Olundu!";
            return sonuc;
        }

        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyelerModel model)
        {
            Uyeler kayit = db.Uyeler.Where(s => s.UyeId == model.UyeId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }

            kayit.KullaniciAdi = model.KullaniciAdi;
            kayit.UyeMail = model.UyeMail;
            kayit.UyeParola = model.UyeParola;
            kayit.UyeTarih = model.UyeTarih;
            kayit.UyeYetki = model.UyeYetki;


            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/uyesil/{uyeId}")]

        public SonucModel UyeSil(int uyeId)
        {
            Uyeler kayit = db.Uyeler.Where(s => s.UyeId == uyeId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }


            if (db.Sorular.Count(s => s.UyeId == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Soru Kaydı Olan Üye Silinemez!";
                return sonuc;
            }

            if (db.Yanitlar.Count(s => s.UyeId == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Yanıt Kaydı Olan Üye Silinemez!";
                return sonuc;
            }

            db.Uyeler.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi";
            return sonuc;
        }

        #endregion


        #region Yanitlar


        [HttpGet]
        [Route("api/yanitliste")]

        public List<YanitlarModel> YanitListe()
        {
            List<YanitlarModel> liste = db.Yanitlar.Select(x => new YanitlarModel()
            {
                YanitId = x.YanitId,
                YanitIcerik = x.YanitIcerik,
                YanitTarih = x.YanitTarih,
                SoruId = x.SoruId,
                UyeId = x.UyeId,
                KullaniciAdi = x.Uyeler.KullaniciAdi,
                sBaslik = x.Sorular.SoruBaslik,
            }).ToList();
            return liste;
        }




        [HttpGet]
        [Route("api/yanitlistebyuyeid/{uyeId}")]

        public List<YanitlarModel> YanitListeByUyeId(int uyeId)
        {
            List<YanitlarModel> liste = db.Yanitlar.Where(s => s.UyeId == uyeId).Select(x => new YanitlarModel()
            {
                YanitId = x.YanitId,
                YanitIcerik = x.YanitIcerik,
                YanitTarih = x.YanitTarih,
                SoruId = x.SoruId,
                UyeId = x.UyeId,
                KullaniciAdi = x.Uyeler.KullaniciAdi,
                sBaslik = x.Sorular.SoruBaslik,
            }).ToList();
            return liste;
        }



        [HttpGet]
        [Route("api/yanitlistebysoruid/{soruId}")]

        public List<YanitlarModel> YanitListeBySoruId(int soruId)
        {
            List<YanitlarModel> liste = db.Yanitlar.Where(s => s.SoruId == soruId).Select(x => new YanitlarModel()
            {
                YanitId = x.YanitId,
                YanitIcerik = x.YanitIcerik,
                YanitTarih = x.YanitTarih,
                SoruId = x.SoruId,
                UyeId = x.UyeId,
                KullaniciAdi = x.Uyeler.KullaniciAdi,
                sBaslik = x.Sorular.SoruBaslik,
            }).ToList();
            return liste;
        }






        [HttpGet]
        [Route("api/yanitlistesoneklenenler/{s}")]

        public List<YanitlarModel> YanitListeSonEklenenler(int s)
        {
            List<YanitlarModel> liste = db.Yanitlar.OrderByDescending(o => o.SoruId).Take(s).Select(x => new YanitlarModel()
            {
                YanitId = x.YanitId,
                YanitIcerik = x.YanitIcerik,
                YanitTarih = x.YanitTarih,
                SoruId = x.SoruId,
                UyeId = x.UyeId,
                KullaniciAdi = x.Uyeler.KullaniciAdi,
                sBaslik = x.Sorular.SoruBaslik,
            }).ToList();
            return liste;
        }


        [HttpGet]
        [Route("api/yanitbyid/{yanitId}")]
        public YanitlarModel YanitById(int yanitId)
        {
            YanitlarModel kayit = db.Yanitlar.Where(s => s.YanitId == yanitId).Select(x => new YanitlarModel()
            {

                YanitId = x.YanitId,
                YanitIcerik = x.YanitIcerik,
                YanitTarih = x.YanitTarih,
                SoruId = x.SoruId,
                UyeId = x.UyeId,
                KullaniciAdi = x.Uyeler.KullaniciAdi,
                sBaslik = x.Sorular.SoruBaslik,

            }).SingleOrDefault();

            return kayit;
        }



        [HttpPost]
        [Route("api/yanitekle")]
        public SonucModel YanitEkle(YanitlarModel model)
        {

            if (db.Yanitlar.Count(s => s.UyeId == model.UyeId && s.SoruId == model.SoruId && s.YanitIcerik == model.YanitIcerik) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Aynı Kişi, Aynı Soruya Aynı Yanıtı Yazamaz!";
                return sonuc;
            }

            Yanitlar yeni = new Yanitlar();

            yeni.YanitId = model.YanitId;
            yeni.YanitIcerik = model.YanitIcerik;
            yeni.YanitTarih = model.YanitTarih;
            yeni.SoruId = model.SoruId;
            yeni.UyeId = model.UyeId;
            db.Yanitlar.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yanıt Eklendi!";


            return sonuc;
        }




        [HttpPut]
        [Route("api/yanitduzenle")]
        public SonucModel YanitDuzenle(YanitlarModel model)
        {

            Yanitlar kayit = db.Yanitlar.Where(s => s.YanitId == model.YanitId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunamadı";
                return sonuc;

            }



            kayit.YanitId = model.YanitId;
            kayit.YanitIcerik = model.YanitIcerik;
            kayit.YanitTarih = model.YanitTarih;
            kayit.SoruId = model.SoruId;
            kayit.UyeId = model.UyeId;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yanıt Düzenlendi!";


            return sonuc;
        }


        [HttpDelete]
        [Route("api/yanitsil/{yanitId}")]
        public SonucModel YanitSil(int yanitId)
        {
            Yanitlar kayit = db.Yanitlar.Where(s => s.YanitId == yanitId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt bulunamadı";
                return sonuc;

            }

            db.Yanitlar.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yanıt Silindi";
            return sonuc;


        }
        #endregion
    }

}

