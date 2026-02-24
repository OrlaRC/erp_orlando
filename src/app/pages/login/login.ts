import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  usuario = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {

    // valida contra el servicio
    const ok = this.auth.login(this.usuario, this.password);

    if (ok) {

      alert('Login exitoso ✅');

      // 🔥 ESTA ES LA CLAVE
      this.router.navigate(['/landing']);

    } else {

      alert('Usuario o contraseña incorrectos ❌');

    }
  }

}