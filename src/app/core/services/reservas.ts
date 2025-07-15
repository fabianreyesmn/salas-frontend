import axios from 'axios';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReservasService {
  private api = `${environment.apiUrl}/reservas`;

  // Método para crear una nueva reserva
  crearReserva(data: any) {
    return axios.post(this.api, data);
  }

  // Método para liberar una reserva por ID
  liberarReserva(id: number) {
    return axios.patch(`${this.api}/${id}/liberar`);
  }

  // Método para obtener todas las reservas
  getReservas() {
    return axios.get(this.api);
  }
}
