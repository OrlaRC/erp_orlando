import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userHard = 'admin';
  private passHard = 'Admin12345!';

  registrar(user: string, pass: string) {
    localStorage.setItem('user', user);
    localStorage.setItem('pass', pass);
  }

  login(user: string, pass: string): boolean {

    const u = localStorage.getItem('user') || '';
    const p = localStorage.getItem('pass') || '';

    const loginValido =
      (user === this.userHard && pass === this.passHard) ||
      (user === u && pass === p);

    if (loginValido) {
      localStorage.setItem('logueado', 'true');
    }

    return loginValido;
  }

  logout() {
    localStorage.clear(); // 🔥 limpia todo
  }

  estaLogueado(): boolean {
    return localStorage.getItem('logueado') === 'true';
  }
}