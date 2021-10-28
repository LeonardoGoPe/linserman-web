import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralesService {

  constructor(
    private apiService: ApiService
  ) { }

  /*----------------Servicios Zona---------------*/
  getZonas() {
    return this.apiService.ApiCall(
      `sectores/`,
      "GET",
    );
  }

  getZona(id: any) {
    return this.apiService.ApiCall(
      `sectores/${id}`,
      "GET",
    );
  }

  putZona(id: any, data: any){
    return this.apiService.ApiCall(
      `sectores/${id}`,
      "PUT",
      data
    );
  }

  postZona(data: any){
    return this.apiService.ApiCall(
      `sectores/`,
      "POST",
      data
    );
  }

  /*------------------------------------------------*/



  /*----------------Servicios Actividades---------------*/
  getActividades() {
    return this.apiService.ApiCall(
      `actividades/`,
      "GET",
    );
  }

  getActividad(id: any) {
    return this.apiService.ApiCall(
      `actividades/${id}`,
      "GET",
    );
  }

  putActividad(id: any, data: any){
    return this.apiService.ApiCall(
      `actividades/${id}`,
      "PUT",
      data
    );
  }

  postActividad(data: any){
    return this.apiService.ApiCall(
      `actividades/`,
      "POST",
      data
    );
  }

  /*------------------------------------------------*/


    /*----------------Servicios Empresa---------------*/
    getEmpresas() {
      return this.apiService.ApiCall(
        `empresas/`,
        "GET",
      );
    }
  
    getEmpresa(id: any) {
      return this.apiService.ApiCall(
        `empresas/${id}`,
        "GET",
      );
    }
  
    putEmpresa(id: any, data: any){
      return this.apiService.ApiCall(
        `empresas/${id}`,
        "PUT",
        data
      );
    }
  
    postEmpresa(data: any){
      return this.apiService.ApiCall(
        `empresas/`,
        "POST",
        data
      );
    }
  
    /*------------------------------------------------*/
  
 /*---------------Contratos----------------------------*/
  getContratos(){
    return this.apiService.ApiCall(
      `contratos/`,
      "GET",
    );
  }

  getContrato(id: any){
    return this.apiService.ApiCall(
      `contratos/${id}`,
      "GET",
    );
  }

  postContratos(data: any){
    return this.apiService.ApiCall(
      `contratos/`,
      "POST",
      data
    );
  }

  /*-------------------------------------------*/
}
