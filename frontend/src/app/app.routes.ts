import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './core/auth.guard';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [publicGuard]
  },
  {
    path: 'users',
    loadComponent: () => import('./users/pages/users/users.component').then(m => m.UsersComponent),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];
