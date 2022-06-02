using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularFinali.ViewModel
{
    public class SorularModel
    {
        public int SoruId { get; set; }
        public string SoruBaslik { get; set; }
        public string SoruIcerik { get; set; }
        public System.DateTime SoruTarih { get; set; }
        public int KategoriId { get; set; }
        public string KategoriAdi { get; set; }
        public string UyeKadi { get; set; }
        public int UyeId { get; set; }
    }
}