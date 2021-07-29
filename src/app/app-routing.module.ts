import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'actividades', loadChildren: () => import('./pages/modulos/actividades/actividades.module').then(m => m.ActividadesModule) },
  { path: 'contratos',  loadChildren: () => import('./pages/modulos/contratos/contratos.module').then(m => m.ContratosModule) },
  { path: 'servicios', loadChildren: () => import('./pages/modulos/servicios/servicios.module').then(m => m.ServiciosModule) },
  { path: 'personal', loadChildren: () => import('./pages/modulos/personal/personal.module').then(m => m.PersonalModule)},
  { path: 'informacion', loadChildren: () => import('./pages/modulos/informacion/informacion.module').then(m => m.InformacionModule)},
  { path: 'generacion-reportes', loadChildren: () => import('./pages/modulos/generacion-reportes/generacion-reportes.module').then(m => m.GeneracionReportesModule)},
  { path: 'reportes', loadChildren: () => import('./pages/modulos/reportes/reportes.module').then(m => m.ReportesModule)},
  {  
    path:'login',
    component:LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
