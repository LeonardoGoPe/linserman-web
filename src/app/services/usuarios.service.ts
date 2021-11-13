import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private apiService: ApiService
  ) { }

  getUsuarios() {
    return this.apiService.ApiCall(
      `usuarios/`,
      "GET",
    );
  }

  getUsuario(id: any) {
    return this.apiService.ApiCall(
      `usuarios/${id}`,
      "GET",
    );
  }

  getUsuariosPorRol(tipo_usuario: any) {
    return this.apiService.ApiCall(
      `usuarios/?tipo_usuario=${tipo_usuario}`,
      "GET",
    );
  }

  postUsuario(data: any){
    return this.apiService.ApiCall(
      `usuarios/`,
      "POST",
      data
    );
  }

  putUsuario(id: any, data: any){
    return this.apiService.ApiCall(
      `usuarios/${id}`,
      "PUT",
      data
    );
  }

  postCambioPassUsuario(id: any, data: any){
    return this.apiService.ApiCall(
      `usuarios/cambiopass/${id}`,
      "POST",
      data
    );
  }

}
