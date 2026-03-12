import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    PasswordModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  usuario = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  login() {

    const ok = this.auth.login(this.usuario, this.password);

    if (ok) {

      this.messageService.add({
        severity: 'success',
        summary: 'Login exitoso',
        detail: 'Bienvenido al sistema'
      });

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1200);

    } else {

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Usuario o contraseña incorrectos'
      });

    }
  }

}