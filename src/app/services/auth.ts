import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioRegistrado = '';
  private passwordRegistrado = '';

  registrar(user: string, pass: string) {
    this.usuarioRegistrado = user;
    this.passwordRegistrado = pass;
  }

  login(user: string, pass: string): boolean {
    return user === this.usuarioRegistrado && pass === this.passwordRegistrado;
  }

}