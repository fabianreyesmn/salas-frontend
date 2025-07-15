import axios from 'axios';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SalasService {
  private api = `${environment.apiUrl}/salas`;

  // Método para obtener todas las salas
  getSalas() {
    return axios.get(this.api);
  }

  // Métodos para crear y eliminar salas
  crearSala(data: any) {
    return axios.post(this.api, data);
  }

  eliminarSala(id: number) {
    return axios.delete(`${this.api}/${id}`);
  }
}
