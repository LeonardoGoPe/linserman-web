import { HttpClient } from '@angular/common/http';
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
      `/usuarios/`,
      "GET",
    );
  }

}
