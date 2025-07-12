import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SalasService } from '../../../core/services/salas';

// Componente para crear una nueva sala
@Component({
  selector: 'app-crear-sala',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear.html',
  styleUrls: ['./crear.scss']
})
// Clase que maneja la creación de una sala
export class Crear {
  private salasService = inject(SalasService);
  private router = inject(Router);

  nombre = '';
  ubicacion = '';
  capacidad: number | null = null;

  // Método para manejar el envío del formulario
  async crear() {
    try {
      await this.salasService.crearSala({
        nombre: this.nombre,
        ubicacion: this.ubicacion,
        capacidad: this.capacidad
      });

      this.router.navigate(['/salas']);
    } catch (error) {
      console.error('Error al crear sala', error);
    }
  }
}
