import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ActividadesComponent } from './pages/modulos/actividades/actividades.component';
import { ContratosComponent } from './pages/modulos/contratos/contratos.component';
import { GeneracionReportesComponent } from './pages/modulos/generacion-reportes/generacion-reportes.component';
import { InformacionComponent } from './pages/modulos/informacion/informacion.component';
import { PersonalComponent } from './pages/modulos/personal/personal.component';
import { ReportesComponent } from './pages/modulos/reportes/reportes.component';
import { ZonasComponent } from './pages/modulos/zonas/zonas.component';

//Guard para la pantalla de login en authentication
import { AuthGuard } from './components/guards/auth.guard';
import { EmpresaComponent } from './pages/modulos/empresa/empresa.component';

const routes: Routes = [
  {
    path: "", redirectTo: "login", pathMatch: "full",
  },

  { 
    path: 'actividades', component:ActividadesComponent,
    canActivate: [AuthGuard],
  },

  { 
    path: 'contratos',  component:ContratosComponent,
    canActivate: [AuthGuard],
   },

  { 
    path: 'zonas-referenciales', component:ZonasComponent,
    canActivate: [AuthGuard],
  },

  { 
    path: 'personal', component:PersonalComponent,
    canActivate: [AuthGuard],
  },

  { 
    path: 'informacion', component:InformacionComponent,
    canActivate: [AuthGuard],
  },

  { 
    path: 'generacion-reportes', component:GeneracionReportesComponent,
    canActivate: [AuthGuard],
  },

  { 
    path: 'reportes', component:ReportesComponent,
    canActivate: [AuthGuard],
  },

  { 
    path: 'empresa', component:EmpresaComponent,
    canActivate: [AuthGuard],
  },

  {  
    path:'login',component:LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
