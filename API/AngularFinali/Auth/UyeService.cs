using AngularFinali.Models;
using AngularFinali.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularFinali.Auth
{
    public class UyeService
    {
        DB07Entities db = new DB07Entities();

        public UyelerModel UyeOturumAc(string kadi, string parola)
        {
            UyelerModel uye = db.Uyeler.Where(s => s.KullaniciAdi == kadi && s.UyeParola == parola).Select(x => new UyelerModel()
            {
                UyeId = x.UyeId,
                UyeMail = x.UyeMail,
                KullaniciAdi = x.KullaniciAdi,
                UyeParola = x.UyeParola,
                UyeYetki = x.UyeYetki,
            }).SingleOrDefault();
            return uye;

        }
    }
}