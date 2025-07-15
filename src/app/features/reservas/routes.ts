import { Routes } from '@angular/router';
import { Crear } from './pages/crear';
import { Listar } from './pages/listar';

// Rutas para el módulo de reservas
export default [
  { path: '', component: Listar },
  { path: 'crear', component: Crear },
] satisfies Routes;
