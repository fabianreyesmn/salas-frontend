import { Component, inject, OnInit, Signal, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalasService } from '../../../core/services/salas';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar.html',
  styleUrls: ['./listar.scss']
})
export class Listar implements OnInit {
  private salasService = inject(SalasService);

  salas: WritableSignal<any[]> = signal([]);

  ngOnInit(): void {
    this.cargarSalas();
  }

  async cargarSalas() {
    try {
      const res = await this.salasService.getSalas();
      this.salas.set(res.data);
    } catch (error) {
      console.error('Error al cargar salas', error);
    }
  }
}
