import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ToolbarModule,
    RouterModule   // 👈 IMPORTANTE
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

  constructor(private router: Router) {}

  irLogin() {
    this.router.navigate(['/login']);
  }

  irRegister() {
    this.router.navigate(['/register']);
  }
}