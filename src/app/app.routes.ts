import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Landing } from './pages/landing/landing';
import { Home } from './pages/home/home';

import { Groups } from './pages/groups/groups';
import { GroupDetail } from './pages/group-detail/group-detail';
import { Users } from './pages/users/users';
import { Profile } from './pages/profile/profile';

import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  // 🔓 PUBLICAS
  { path: '', component: Landing },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // 🔒 PRIVADAS (Layout protegido)
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: Home },
      { path: 'groups', component: Groups },

      // 👇 NUEVA RUTA (detalle del grupo)
      { path: 'groups/:id', component: GroupDetail },

      { path: 'users', component: Users },
      { path: 'profile', component: Profile }
    ]
  },

  { path: '**', redirectTo: '' }
];