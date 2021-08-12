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

  getUsuariosPorRol(tipo_usuario: any) {
    return this.apiService.ApiCall(
      `usuarios/?tipo_usuario=${tipo_usuario}`,
      "GET",
    );
  }

}
