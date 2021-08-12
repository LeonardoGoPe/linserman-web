import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralesService {

  constructor(
    private apiService: ApiService
  ) { }

  getSectores() {
    return this.apiService.ApiCall(
      `sectores/`,
      "GET",
    );
  }

  getActividades() {
    return this.apiService.ApiCall(
      `actividades/`,
      "GET",
    );
  }

  getContratos(){
    return this.apiService.ApiCall(
      `contratos/`,
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
}
