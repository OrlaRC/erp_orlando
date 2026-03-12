export type TicketStatus =
  | 'Pendiente'
  | 'En progreso'
  | 'Revisión'
  | 'Finalizado';

export type TicketPriority =
  | 'Baja'
  | 'Media'
  | 'Alta'
  | 'Urgente';

export interface TicketComment {
  usuario: string;
  mensaje: string;
  fecha: Date;
}

export interface TicketHistory {
  campo: string;
  valorAnterior: string;
  valorNuevo: string;
  usuario: string;
  fecha: Date;
}

export interface Ticket {

  id: number;

  titulo: string;

  descripcion: string;

  estado: TicketStatus;

  prioridad: TicketPriority;

  asignadoA?: string;

  fechaCreacion: Date;

  fechaLimite?: Date;

  comentarios: TicketComment[];

  historial: TicketHistory[];

  groupId?: number;

}