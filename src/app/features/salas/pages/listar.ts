import {
  Component,
  inject,
  OnInit,
  Signal,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalasService } from '../../../core/services/salas';
import { RouterModule } from '@angular/router';
import { ConfirmacionDialogComponent } from '../../../shared/components/confirmacion-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

// Componente para listar las salas
@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSnackBarModule, FormsModule],
  templateUrl: './listar.html',
  styleUrls: ['./listar.scss'],
})
export class Listar implements OnInit {
  // Servicio inyectado para manejar las salas
  private salasService = inject(SalasService);
  private snackBar = inject(MatSnackBar);

  // Propiedades para manejar mensajes y filtros
  filtroEstado: string = '';
  filtroCapacidad: number | null = null;

  dialog = inject(MatDialog);
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

  // Método que devuelve las salas filtradas según estado y capacidad
  salasFiltradas() {
    return this.salas().filter((sala) => {
      const coincideEstado =
        this.filtroEstado === '' ||
        (this.filtroEstado === 'disponible' && sala.estado === 'disponible') ||
        (this.filtroEstado === 'no-disponible' && sala.estado !== 'disponible');

      const coincideCapacidad =
        this.filtroCapacidad == null || sala.capacidad >= this.filtroCapacidad;

      return coincideEstado && coincideCapacidad;
    });
  }

  // Método para eliminar una sala
  async eliminarSala(id: number) {
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent, {
      width: '350px',
      data: { mensaje: '¿Estás seguro de que deseas eliminar esta sala?' },
    });

    const resultado = await dialogRef.afterClosed().toPromise();
    if (!resultado) return;

    try {
      await this.salasService.eliminarSala(id);
      await this.cargarSalas();
      this.snackBar.open('Sala eliminada exitosamente', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-exito'],
      });
    } catch (err) {
      this.snackBar.open(
        'No se pudo eliminar. Puede tener reservas activas.',
        'Cerrar',
        {
          duration: 4000,
          panelClass: ['snackbar-error'],
        }
      );
    }
  }
}
