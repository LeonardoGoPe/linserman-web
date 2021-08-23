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
import { HttpClientModule } from '@angular/common/http';    // add this
import { UsuariosService } from './services/usuarios.service';    // add this

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { NombrecontratoPipe } from './pipes/nombrecontrato.pipe';
import { ZonasComponent } from './pages/modulos/zonas/zonas.component';
import { EditarZonaComponent } from './pages/modulos/zonas/component/editar-zona/editar-zona.component';
import { CrearZonaComponent } from './pages/modulos/zonas/component/crear-zona/crear-zona.component';
import { CrearPersonalComponent } from './pages/modulos/personal/component/crear-personal/crear-personal.component';
import { EditarPersonalComponent } from './pages/modulos/personal/component/editar-personal/editar-personal.component';
import { CrearActividadComponent } from './pages/modulos/actividades/component/crear-actividad/crear-actividad.component';
import { EditarActividadComponent } from './pages/modulos/actividades/component/editar-actividad/editar-actividad.component';
import { CrearContratoComponent } from './pages/modulos/contratos/component/crear-contrato/crear-contrato.component';
import { EditarContratoComponent } from './pages/modulos/contratos/component/editar-contrato/editar-contrato.component';
import { ElegirContratoComponent } from './pages/modulos/generacion-reportes/component/elegir-contrato/elegir-contrato.component';
import { ElegirNombreComponent } from './pages/modulos/generacion-reportes/component/elegir-nombre/elegir-nombre.component';


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
    NombrecontratoPipe,
    ZonasComponent,
    EditarZonaComponent,
    CrearZonaComponent,
    CrearPersonalComponent,
    EditarPersonalComponent,
    CrearActividadComponent,
    EditarActividadComponent,
    CrearContratoComponent,
    EditarContratoComponent,
    ElegirContratoComponent,
    ElegirNombreComponent,
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
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgxPaginationModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
