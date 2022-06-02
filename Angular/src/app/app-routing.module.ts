
import { UyesorularComponent } from './components/uyesorular/uyesorular.component';
import { KategorilerComponent } from './components/kategoriler/kategoriler.component';
import { SorularComponent } from './components/sorular/sorular.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { AdminUyelerComponent } from './components/admin/admin-uyeler/admin-uyeler.component';

import { AdminKategorilerComponent } from './components/admin/admin-kategoriler/admin-kategoriler.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSorularComponent } from './components/admin/admin-sorular/admin-sorular.component';
import { AuthGuard } from './services/AuthGuard';
import { AdminYanitlarComponent } from './components/admin/admin-yanitlar/admin-yanitlar.component';


const routes: Routes =
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'sorular/:soruId',
    component: SorularComponent
  },
  {
    path: 'kategori/:katId',
    component: KategorilerComponent
  },
  {
    path: 'uyesorular/:UyeId',
    component: UyesorularComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'admin/kategoriler',
    component: AdminKategorilerComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'admin/sorular',
    component: AdminSorularComponent
  },
  {
    path: 'admin/yanitlar',
    component: AdminYanitlarComponent
  },
  {
    path: 'admin/sorular/:katId',
    component: AdminSorularComponent
  },
  {
    path: 'admin/uyeler',
    component: AdminUyelerComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
