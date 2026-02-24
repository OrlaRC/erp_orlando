import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Landing } from './pages/landing/landing';

export const routes: Routes = [

  // Ruta inicial (la primera que se ve)
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Páginas
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'landing', component: Landing },

  // Si la ruta no existe
  { path: '**', redirectTo: 'login' }

];