import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userHard = 'admin';
  private passHard = 'Admin12345!';

  // REGISTRAR USUARIO
  registrar(usuario: any) {
    localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario));
  }

  // LOGIN
  login(user: string, pass: string): boolean {

    const data = localStorage.getItem('usuarioRegistrado');
    const usuario = data ? JSON.parse(data) : null;

    const loginValido =
      (user === this.userHard && pass === this.passHard) ||
      (usuario && user === usuario.usuario && pass === usuario.password);

    if (loginValido) {
      localStorage.setItem('logueado', 'true');

      if (usuario) {
        localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
      }
    }

    return loginValido;
  }

  // OBTENER USUARIO ACTUAL
  obtenerUsuario() {
    const data = localStorage.getItem('usuarioActivo');
    return data ? JSON.parse(data) : null;
  }

  // LOGOUT
  logout() {
    localStorage.removeItem('logueado');
    localStorage.removeItem('usuarioActivo');
  }

  // VALIDAR SESIÓN
  estaLogueado(): boolean {

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('logueado') === 'true';
    }

    return false;
  }
}