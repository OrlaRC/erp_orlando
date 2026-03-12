import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private tickets: Ticket[] = [
    {
      id: 1,
      titulo: 'Error en login',
      descripcion: 'No permite iniciar sesión',
      estado: 'Pendiente',
      prioridad: 'Alta',
      asignadoA: 'Carlos',
      fechaCreacion: new Date(),
      fechaLimite: new Date(),
      comentarios: [],
      historial: [],
      groupId: 1
    },
    {
      id: 2,
      titulo: 'Actualizar dashboard',
      descripcion: 'Cambiar diseño principal',
      estado: 'En progreso',
      prioridad: 'Media',
      asignadoA: 'Ana',
      fechaCreacion: new Date(),
      fechaLimite: new Date(),
      comentarios: [],
      historial: [],
      groupId: 1
    }
  ];

  private ticketsSubject = new BehaviorSubject<Ticket[]>(this.tickets);

  tickets$ = this.ticketsSubject.asObservable();

  constructor() {}

  getTickets() {
    return this.tickets$;
  }

  addTicket(ticket: Ticket) {

    ticket.id = Date.now();

    this.tickets.push(ticket);

    this.ticketsSubject.next([...this.tickets]);

  }

  updateTicket(ticket: Ticket) {

    const index = this.tickets.findIndex(t => t.id === ticket.id);

    if (index !== -1) {

      this.tickets[index] = ticket;

      this.ticketsSubject.next([...this.tickets]);

    }

  }

  getTicketsByGroup(groupId: number) {

    return this.tickets.filter(ticket => ticket.groupId === groupId);

  }

}