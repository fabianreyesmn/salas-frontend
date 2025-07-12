import { Routes } from '@angular/router';
import { Listar } from './features/salas/pages/listar';
import { Crear } from './features/salas/pages/crear';
import { Crear as CrearReserva } from './features/reservas/pages/crear';

export const routes: Routes = [
  { path: '', redirectTo: 'salas', pathMatch: 'full' },
  { path: 'salas', component: Listar },
  { path: 'salas/crear', component: Crear },
  { path: 'reservas/crear', component: CrearReserva }
];
