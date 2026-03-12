import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';

import { TicketService } from '../../services/ticket';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-create-ticket-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    DatePickerModule,
    ButtonModule
  ],
  templateUrl: './create-ticket-dialog.html',
  styleUrl: './create-ticket-dialog.css'
})
export class CreateTicketDialog {

  visible = false;

  prioridades = [
    { name: 'Alta', value: 'Alta' },
    { name: 'Media', value: 'Media' },
    { name: 'Baja', value: 'Baja' }
  ];

  estados = [
    { name: 'Pendiente', value: 'Pendiente' },
    { name: 'En progreso', value: 'En progreso' },
    { name: 'Revisión', value: 'Revisión' },
    { name: 'Finalizado', value: 'Finalizado' }
  ];

  ticket: Ticket = this.createEmptyTicket();

  constructor(private ticketService: TicketService) {}

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  createTicket() {

    const newTicket: Ticket = {
      ...this.ticket,
      id: 0,
      fechaCreacion: new Date()
    };

    this.ticketService.addTicket(newTicket);

    this.resetForm();
    this.close();
  }

  resetForm() {
    this.ticket = this.createEmptyTicket();
  }

  createEmptyTicket(): Ticket {
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
      groupId: 1
    };
  }

}