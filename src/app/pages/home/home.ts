import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { TicketService } from '../../services/ticket';
import { Ticket } from '../../models/ticket.model';

import { CreateTicketDialog } from '../../components/create-ticket-dialog/create-ticket-dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    CreateTicketDialog
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  today = new Date();

  users = [
    { id: 1, nombre: 'Orlando', grupo: 'Admin', fecha: new Date() },
    { id: 2, nombre: 'Carlos', grupo: 'Ventas', fecha: new Date() }
  ];

  groups = [
    { id: 1, nombre: 'Admin' },
    { id: 2, nombre: 'Ventas' }
  ];

  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit() {

    this.ticketService.getTickets().subscribe(data => {
      this.tickets = data;
    });

  }

  get totalUsers() {
    return this.users.length;
  }

  get totalGroups() {
    return this.groups.length;
  }

  get lastUser() {
    return this.users[this.users.length - 1];
  }

}