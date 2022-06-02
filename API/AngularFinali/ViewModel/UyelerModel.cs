using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularFinali.ViewModel
{
    public class UyelerModel
    {
        public int UyeId { get; set; }
        public string KullaniciAdi { get; set; }
        public string UyeMail { get; set; }
        public System.DateTime UyeTarih { get; set; }
        public int UyeYetki { get; set; }
        public string UyeParola { get; set; }
    }
}