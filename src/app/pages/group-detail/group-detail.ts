import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../services/ticket';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-detail.html',
  styleUrl: './group-detail.css'
})
export class GroupDetail implements OnInit {

  groupId!: number;

  pendientes: Ticket[] = [];
  progreso: Ticket[] = [];
  revision: Ticket[] = [];
  finalizados: Ticket[] = [];

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit() {

    this.groupId = Number(this.route.snapshot.paramMap.get('id'));

    const tickets = this.ticketService.getTicketsByGroup(this.groupId);

    this.pendientes = tickets.filter(t => t.estado === 'Pendiente');
    this.progreso = tickets.filter(t => t.estado === 'En progreso');
    this.revision = tickets.filter(t => t.estado === 'Revisión');
    this.finalizados = tickets.filter(t => t.estado === 'Finalizado');

  }

}