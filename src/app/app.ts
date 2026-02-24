import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router'; // 👈 IMPORTANTE

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ButtonModule,
    RouterOutlet   // 👈 AQUÍ ESTÁ LA CLAVE
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  mensaje = '';

  mostrarMensaje() {
    this.mensaje = '✅ Botón PrimeNG funcionando';
  }

}