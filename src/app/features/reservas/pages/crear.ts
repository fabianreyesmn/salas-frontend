import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservasService } from '../../../core/services/reservas';
import { SalasService } from '../../../core/services/salas';

@Component({
  selector: 'app-crear-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear.html',
  styleUrls: ['./crear.scss']
})
export class Crear implements OnInit {
  private reservasService = inject(ReservasService);
  private salasService = inject(SalasService);
  private router = inject(Router);

  salas: any[] = [];

  salaId: number | null = null;
  inicio: string = '';
  fin: string = '';
  error: string = '';

  ngOnInit(): void {
    this.obtenerSalas();
  }

  async obtenerSalas() {
    try {
      const res = await this.salasService.getSalas();
      this.salas = res.data;
    } catch (err) {
      console.error('Error al obtener salas', err);
    }
  }

  async crear() {
    this.error = '';

    try {
      await this.reservasService.crearReserva({
        salaId: this.salaId,
        inicio: this.inicio,
        fin: this.fin
      });

      this.router.navigate(['/salas']);
    } catch (err: any) {
      console.error('Error al crear reserva', err);
      this.error = err?.response?.data?.error || 'Error desconocido';
    }
  }
}
