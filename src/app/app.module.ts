import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CargandoComponent } from './components/cargando/cargando.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { LoginComponent } from './pages/login/login.component';
import { PersonalComponent } from './pages/modulos/personal/personal.component';
import { ContratosComponent } from './pages/modulos/contratos/contratos.component';
import { ActividadesComponent } from './pages/modulos/actividades/actividades.component';
import { ReportesComponent } from './pages/modulos/reportes/reportes.component';
import { GeneracionReportesComponent } from './pages/modulos/generacion-reportes/generacion-reportes.component';
import { InformacionComponent } from './pages/modulos/informacion/informacion.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertaComponent } from './components/alerta/alerta.component';
import { ModalCrearContratoComponent } from './pages/modulos/contratos/components/modal-crear-contrato/modal-crear-contrato.component';
import { HttpClientModule } from '@angular/common/http';    // add this
import { UsuariosService } from './services/usuarios.service';    // add this

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { SectoresComponent } from './pages/modulos/sectores/sectores.component';


@NgModule({
  declarations: [
    AppComponent,
    CargandoComponent,
    NavegacionComponent,
    LoginComponent,
    PersonalComponent,
    ContratosComponent,
    ActividadesComponent,
    ReportesComponent,
    GeneracionReportesComponent,
    InformacionComponent,
    AlertaComponent,
    ModalCrearContratoComponent,
    SectoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShowHidePasswordModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,            // imports firebase/database, only needed for database features
    AngularFireStorageModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
