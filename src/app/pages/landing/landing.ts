import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ToolbarModule
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }

}