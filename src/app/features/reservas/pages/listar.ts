import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasService } from '../../../core/services/reservas';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-reservas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar.html',
  styleUrls: ['./listar.scss']
})
export class Listar implements OnInit {
  private reservasService = inject(ReservasService);

  reservas: any[] = [];
  mensaje = '';
  error = '';

  ngOnInit(): void {
    this.cargarReservas();
  }

  async cargarReservas() {
    try {
      const res = await this.reservasService.getReservas();
      this.reservas = res.data.filter((r: any) => r.estado === 'activa');
    } catch (err) {
      this.error = 'Error al obtener reservas';
      console.error(err);
    }
  }

  async liberar(id: number) {
    this.error = '';
    this.mensaje = '';
    try {
      const res = await this.reservasService.liberarReserva(id);
      this.mensaje = res.data.mensaje;
      this.cargarReservas(); // recargar lista
    } catch (err: any) {
      this.error = err?.response?.data?.error || 'Error al liberar reserva';
      console.error(err);
    }
  }
}
