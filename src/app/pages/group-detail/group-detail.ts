import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { DragDropModule, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

import { TicketService } from '../../services/ticket';
import { Ticket, TicketStatus, TicketPriority } from '../../models/ticket.model';

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DragDropModule
  ],
  templateUrl: './group-detail.html',
  styleUrl: './group-detail.css'
})
export class GroupDetail implements OnInit {

  groupId!: number;

  tickets: Ticket[] = [];

  pendientes: Ticket[] = [];
  progreso: Ticket[] = [];
  revision: Ticket[] = [];
  finalizado: Ticket[] = [];

  dialogVisible = false;
  detailDialogVisible = false;

  ticket: Ticket = this.resetTicket();

  selectedTicket!: Ticket;

  newComment = '';

  prioridades: TicketPriority[] = [
    'Baja',
    'Media',
    'Alta',
    'Urgente'
  ];

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit() {

    this.groupId = Number(this.route.snapshot.paramMap.get('id'));

    this.reloadTickets();

  }

  reloadTickets(){

    this.ticketService.getTickets().subscribe(data => {

      this.tickets = data.filter(t => t.groupId === this.groupId);

      this.organizeTickets();

    });

  }

  resetTicket(): Ticket {

    return {
      id: 0,
      titulo: '',
      descripcion: '',
      estado: 'Pendiente',
      prioridad: 'Media',
      asignadoA: '',
      fechaCreacion: new Date(),
      fechaLimite: new Date(),
      comentarios: [],
      historial: [],
      groupId: this.groupId
    };

  }

  openDialog(){

    this.ticket = this.resetTicket();

    this.dialogVisible = true;

  }

  createTicket(){

    this.ticket.historial.push({
      campo: 'Creación',
      valorAnterior: '',
      valorNuevo: 'Ticket creado',
      usuario: 'Sistema',
      fecha: new Date()
    });

    this.ticketService.addTicket({
      ...this.ticket,
      fechaCreacion: new Date()
    });

    this.dialogVisible = false;

    this.reloadTickets();

  }

  organizeTickets(){

    this.pendientes = this.tickets.filter(t => t.estado === 'Pendiente');

    this.progreso = this.tickets.filter(t => t.estado === 'En progreso');

    this.revision = this.tickets.filter(t => t.estado === 'Revisión');

    this.finalizado = this.tickets.filter(t => t.estado === 'Finalizado');

  }

  drop(event: CdkDragDrop<Ticket[]>, estado: TicketStatus){

    if (event.previousContainer !== event.container) {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const ticket = event.container.data[event.currentIndex];

      const estadoAnterior = ticket.estado;

      ticket.estado = estado;

      ticket.historial.push({
        campo: 'Estado',
        valorAnterior: estadoAnterior,
        valorNuevo: estado,
        usuario: 'Usuario',
        fecha: new Date()
      });

    }

  }

  openTicketDetail(ticket: Ticket){

    this.selectedTicket = ticket;

    this.detailDialogVisible = true;

  }

  addComment(){

    if(!this.newComment) return;

    this.selectedTicket.comentarios.push({
      usuario: 'Usuario',
      mensaje: this.newComment,
      fecha: new Date()
    });

    this.selectedTicket.historial.push({
      campo: 'Comentario',
      valorAnterior: '',
      valorNuevo: this.newComment,
      usuario: 'Usuario',
      fecha: new Date()
    });

    this.newComment = '';

  }

}