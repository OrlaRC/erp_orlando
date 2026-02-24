import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

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
  email = '';
  password = '';
  confirmPassword = '';
  nombre = '';
  direccion = '';
  telefono = '';
  edad: number | null = null;

  constructor(
  private router: Router,
  private auth: AuthService
) {}

  registrar() {

    // 1️⃣ Campos vacíos
    if (
      !this.usuario || !this.email || !this.password || !this.confirmPassword ||
      !this.nombre || !this.direccion || !this.telefono || !this.edad
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // 2️⃣ Password mínimo 10 caracteres y símbolo
    const regexPass = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;

    if (!regexPass.test(this.password)) {
      alert('La contraseña debe tener mínimo 10 caracteres y un símbolo especial (!@#$%^&*)');
      return;
    }

    // 3️⃣ Confirmar password
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // 4️⃣ Mayor de edad
    if (this.edad < 18) {
      alert('Debes ser mayor de edad');
      return;
    }

    // 5️⃣ Teléfono solo números
const regexTel = /^[0-9]+$/;

if (!regexTel.test(this.telefono)) {
  alert('El teléfono solo debe contener números');
  return;
}

// 🔹 GUARDAR USUARIO
this.auth.registrar(this.usuario, this.password);

alert('Registro exitoso ✅');

this.router.navigate(['/login']);
  }
}