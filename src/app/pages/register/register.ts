import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CardModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    PasswordModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  usuario: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  nombre: string = '';
  direccion: string = '';
  telefono: string = '';
  edad: number | null = null;

  mostrarReglasPassword: boolean = false;
  mostrarReglasEdad: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private messageService: MessageService
  ) {}

  // Regex
  regexPass: RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{10,}$/;
  regexTel: RegExp = /^[0-9]{10,13}$/;

  // Validaciones

  get passwordValida(): boolean {
    return this.regexPass.test(this.password);
  }

  get esMayorEdad(): boolean {
    return this.edad !== null && this.edad >= 18;
  }

  get passwordsCoinciden(): boolean {
    return (
      this.password === this.confirmPassword &&
      this.confirmPassword.length > 0
    );
  }

  get telefonoValido(): boolean {
    return !!this.telefono && this.regexTel.test(this.telefono);
  }

  get formularioValido(): boolean {
    return !!(
      this.usuario.trim() &&
      this.email.trim() &&
      this.nombre.trim() &&
      this.direccion.trim() &&
      this.telefonoValido &&
      this.passwordValida &&
      this.passwordsCoinciden &&
      this.esMayorEdad
    );
  }

  // Evita espacios múltiples
  limpiarEspacios(valor: string): string {
    if (!valor) return '';
    return valor.trimStart().replace(/\s{2,}/g, ' ');
  }

  // Solo números en teléfono
  soloNumeros(event: KeyboardEvent) {
    const char = event.key;

    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  }

  registrar() {

  this.usuario = this.usuario.trim();
  this.email = this.email.trim();
  this.nombre = this.nombre.trim();
  this.direccion = this.direccion.trim();
  this.telefono = this.telefono.trim();

  if (!this.formularioValido) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Revisa los campos del formulario',
      life: 3000
    });
    return;
  }

  this.auth.registrar({
    usuario: this.usuario,
    email: this.email,
    password: this.password,
    nombre: this.nombre,
    direccion: this.direccion,
    telefono: this.telefono,
    edad: this.edad
  });

  this.messageService.add({
    severity: 'success',
    summary: 'Registro exitoso',
    detail: 'Tu cuenta fue creada correctamente',
    life: 2000
  });

  setTimeout(() => {
    this.router.navigate(['/login']);
  }, 2000);

}

}