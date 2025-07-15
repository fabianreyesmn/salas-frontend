import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReservasService } from '../../../core/services/reservas';
import { SalasService } from '../../../core/services/salas';

@Component({
  selector: 'app-crear-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear.html',
  styleUrls: ['./crear.scss'],
})
export class Crear implements OnInit {
  // Servicios inyectados para manejar reservas y salas
  private reservasService = inject(ReservasService);
  private salasService = inject(SalasService);
  private router = inject(Router);

  salas: any[] = [];
  // Propiedades del formulario
  salaId: number | null = null;
  inicio: string = '';
  fin: string = '';
  error: string = '';

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.obtenerSalas();
  }

  // Método para obtener las salas disponibles
  async obtenerSalas() {
    try {
      const res = await this.salasService.getSalas();
      this.salas = res.data;
    } catch (err) {
      console.error('Error al obtener salas', err);
    }
  }

  // Método para crear una nueva reserva
  async crear() {
    this.error = '';

    // Validación
    try {
      // Convertir a ISO en UTC para evitar desfases
      const inicioUTC = new Date(this.inicio).toISOString();
      const finUTC = new Date(this.fin).toISOString();

      await this.reservasService.crearReserva({
        salaId: this.salaId,
        inicio: inicioUTC,
        fin: finUTC,
      });

      this.router.navigate(['/reservas']);
    } catch (err: any) {
      console.error('Error al crear reserva', err);
      this.error = err?.response?.data?.error || 'Error desconocido';
    }
  }
}
