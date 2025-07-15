import { Routes } from '@angular/router';
import { Listar } from './features/salas/pages/listar';
import { Crear } from './features/salas/pages/crear';

// Rutas principales de la aplicación
export const routes: Routes = [
  { path: '', redirectTo: 'salas', pathMatch: 'full' },
  { path: 'salas', component: Listar },
  { path: 'salas/crear', component: Crear },
  { path: 'reservas', loadChildren: () => import('./features/reservas/routes') }
];
