using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularFinali.ViewModel
{
    public class YanitlarModel
    {
        public int YanitId { get; set; }
        public string YanitIcerik { get; set; }
        public System.DateTime YanitTarih { get; set; }
        public int UyeId { get; set; }
        public int SoruId { get; set; }
        public string KullaniciAdi { get; set; }
        public string sBaslik { get; set; }
    }
}