﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AngularFinali.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class DB07Entities : DbContext
    {
        public DB07Entities()
            : base("name=DB07Entities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Kategoriler> Kategoriler { get; set; }
        public virtual DbSet<Sorular> Sorular { get; set; }
        public virtual DbSet<Uyeler> Uyeler { get; set; }
        public virtual DbSet<Yanitlar> Yanitlar { get; set; }
    }
}
