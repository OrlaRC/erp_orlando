import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

/* IMPORTACIONES NUEVAS */
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),

    /* CONFIGURACIÓN DEL TEMA */
    providePrimeNG({
      theme: {
        preset: Lara
      }
    })
  ]
};