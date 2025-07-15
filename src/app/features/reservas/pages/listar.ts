import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservasService } from '../../../core/services/reservas';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-reservas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listar.html',
  styleUrls: ['./listar.scss'],
})
export class Listar implements OnInit {
  // Servicios inyectados para manejar reservas
  private reservasService = inject(ReservasService);

  reservas: any[] = [];
  mensaje = '';
  error = '';
  filtroFecha: string = '';

  ngOnInit(): void {
    this.cargarReservas();
  }

  // Método para cargar las reservas activas
  async cargarReservas() {
    try {
      const res = await this.reservasService.getReservas();
      this.reservas = res.data.filter((r: any) => r.estado === 'activa');
    } catch (err) {
      this.error = 'Error al obtener reservas';
      console.error(err);
    }
  }

  // Método para filtrar las reservas por fecha
  reservasFiltradas() {
    if (!this.filtroFecha) return this.reservas;

    return this.reservas.filter((r) => {
      const inicio = new Date(r.inicio);
      const yyyy = inicio.getFullYear();
      const mm = String(inicio.getMonth() + 1).padStart(2, '0');
      const dd = String(inicio.getDate()).padStart(2, '0');
      const fechaLocal = `${yyyy}-${mm}-${dd}`; // esto es en hora local

      return fechaLocal === this.filtroFecha;
    });
  }

  // Método para liberar una reserva
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
