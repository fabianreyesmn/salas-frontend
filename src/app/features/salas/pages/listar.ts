import { Component, inject, OnInit, Signal, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalasService } from '../../../core/services/salas';
import { RouterModule } from '@angular/router';

// Componente para listar las salas
@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar.html',
  styleUrls: ['./listar.scss']
})
// Clase que implementa OnInit para cargar las salas al iniciar
export class Listar implements OnInit {
  private salasService = inject(SalasService);

  salas: WritableSignal<any[]> = signal([]);

  ngOnInit(): void {
    this.cargarSalas();
  }

  // Método para cargar las salas desde el servicio
  async cargarSalas() {
    try {
      const res = await this.salasService.getSalas();
      this.salas.set(res.data);
    } catch (error) {
      console.error('Error al cargar salas', error);
    }
  }

  // Método para eliminar una sala
  async eliminarSala(id: number) {
  const ok = confirm('¿Seguro que deseas eliminar esta sala?');
  if (!ok) return;

  try {
    await this.salasService.eliminarSala(id);
    await this.cargarSalas();
    alert('Sala eliminada');
  } catch (err) {
    alert('No se pudo eliminar. Puede tener reservas activas.');
  }
}

}
