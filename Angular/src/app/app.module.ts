

import { UyesorularComponent } from './components/uyesorular/uyesorular.component';
import { KategorilerComponent } from './components/kategoriler/kategoriler.component';
import { SorularComponent } from './components/sorular/sorular.component';
import { AdminUyelerComponent } from './components/admin/admin-uyeler/admin-uyeler.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { AuthGuard } from './services/AuthGuard';
import { Authinterceptor } from './services/Authinterceptor';
import { ApiService } from 'src/app/services/api.service';
import { SafeHtmlPipe } from './pipes/safeHtml-pipe.pipe';
import { SoruDialogComponent } from './components/dialogs/soru-dialog/soru-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { AdminSorularComponent } from './components/admin/admin-sorular/admin-sorular.component';
import { AdminKategorilerComponent } from './components/admin/admin-kategoriler/admin-kategoriler.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JoditAngularModule } from 'jodit-angular';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { AdminYanitlarComponent } from './components/admin/admin-yanitlar/admin-yanitlar.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    LoginComponent,
    SorularComponent,
    KategorilerComponent,
    UyesorularComponent,

    //Admin
    AdminKategorilerComponent,
    AdminComponent,
    AdminSorularComponent,
    AdminUyelerComponent,
    AdminYanitlarComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    UyeDialogComponent,
    SoruDialogComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MatSortModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    JoditAngularModule,
    
  
  ],

  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    SoruDialogComponent,
    UyeDialogComponent

  ],
  providers: [MyAlertService, ApiService, SafeHtmlPipe,AuthGuard,
  {provide: HTTP_INTERCEPTORS, useClass: Authinterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
