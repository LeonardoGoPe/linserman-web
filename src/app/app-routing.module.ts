import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ActividadesComponent } from './pages/modulos/actividades/actividades.component';
import { ContratosComponent } from './pages/modulos/contratos/contratos.component';
import { GeneracionReportesComponent } from './pages/modulos/generacion-reportes/generacion-reportes.component';
import { InformacionComponent } from './pages/modulos/informacion/informacion.component';
import { PersonalComponent } from './pages/modulos/personal/personal.component';
import { ReportesComponent } from './pages/modulos/reportes/reportes.component';
import { SectoresComponent } from './pages/modulos/sectores/sectores.component';

const routes: Routes = [
  { 
    path: '',   redirectTo: '/login', pathMatch: 'full' 
  },

  { 
    path: 'actividades', component:ActividadesComponent 
  },

  { 
    path: 'contratos',  component:ContratosComponent 
   },

  { 
    path: 'sectores', component:SectoresComponent 
  },

  { 
    path: 'personal', component:PersonalComponent
  },

  { 
    path: 'informacion', component:InformacionComponent
  },

  { 
    path: 'generacion-reportes', component:GeneracionReportesComponent
  },

  { 
    path: 'reportes', component:ReportesComponent
  },

  {  
    path:'login',component:LoginComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
