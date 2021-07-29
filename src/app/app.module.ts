import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CargandoComponent } from './components/cargando/cargando.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { LoginComponent } from './pages/login/login.component';
import { PersonalComponent } from './pages/modulos/personal/personal.component';
import { ContratosComponent } from './pages/modulos/contratos/contratos.component';
import { ServiciosComponent } from './pages/modulos/servicios/servicios.component';
import { ActividadesComponent } from './pages/modulos/actividades/actividades.component';
import { ReportesComponent } from './pages/modulos/reportes/reportes.component';
import { GeneracionReportesComponent } from './pages/modulos/generacion-reportes/generacion-reportes.component';
import { InformacionComponent } from './pages/modulos/informacion/informacion.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CargandoComponent,
    NavegacionComponent,
    LoginComponent,
    PersonalComponent,
    ContratosComponent,
    ServiciosComponent,
    ActividadesComponent,
    ReportesComponent,
    GeneracionReportesComponent,
    InformacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShowHidePasswordModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
