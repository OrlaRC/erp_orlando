import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CardModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  usuario = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  registrar() {
    if (!this.usuario || !this.password) {
      alert('Completa todos los campos');
      return;
    }

    this.auth.registrar(this.usuario, this.password);

    alert('Usuario registrado correctamente ✅');

    this.router.navigate(['/login']);
  }

}