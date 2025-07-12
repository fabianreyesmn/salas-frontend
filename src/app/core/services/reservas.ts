import axios from 'axios';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReservasService {
  private api = `${environment.apiUrl}/reservas`;

  crearReserva(data: any) {
    return axios.post(this.api, data);
  }

  liberarReserva(id: number) {
    return axios.patch(`${this.api}/${id}/liberar`);
  }

  getReservas() {
    return axios.get(this.api);
  }
}
