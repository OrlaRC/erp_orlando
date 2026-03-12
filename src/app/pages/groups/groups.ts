import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-groups',
  standalone: true,
  providers: [MessageService],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToastModule
  ],
  templateUrl: './groups.html',
  styleUrl: './groups.css'
})
export class Groups implements OnInit {

  groups: any[] = [];

  group: any = this.resetGroup();

  dialogVisible = false;
  editing = false;

  constructor(
    private message: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadGroups();
  }

  // 🔹 Modelo vacío
  resetGroup() {
    return {
      id: '',
      nombre: '',
      categoria: '',
      nivel: '',
      autor: '',
      miembros: '',
      tickets: ''
    };
  }

  // 🔹 Cargar de LocalStorage
  loadGroups() {
    const data = localStorage.getItem('groups');
    this.groups = data ? JSON.parse(data) : [];
  }

  // 🔹 Guardar en LocalStorage
  saveGroups() {
    localStorage.setItem('groups', JSON.stringify(this.groups));
  }

  // 🔹 Abrir modal nuevo
  newGroup() {
    this.group = this.resetGroup();
    this.editing = false;
    this.dialogVisible = true;
  }

  // 🔹 Editar
  editGroup(g: any) {
    this.group = { ...g };
    this.editing = true;
    this.dialogVisible = true;
  }

  // 🔹 Guardar
  saveGroup() {

    if (!this.group.nombre || !this.group.autor) {
      this.message.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Campos obligatorios'
      });
      return;
    }

    if (this.editing) {

      const index = this.groups.findIndex(x => x.id === this.group.id);
      this.groups[index] = this.group;

      this.message.add({
        severity: 'success',
        summary: 'Actualizado',
        detail: 'Grupo actualizado'
      });

    } else {

      this.group.id = Date.now();
      this.groups.push({ ...this.group });

      this.message.add({
        severity: 'success',
        summary: 'Creado',
        detail: 'Grupo creado'
      });

    }

    this.saveGroups();
    this.dialogVisible = false;
  }

  // 🔹 Eliminar
  deleteGroup(g: any) {

    this.groups = this.groups.filter(x => x.id !== g.id);

    this.saveGroups();

    this.message.add({
      severity: 'warn',
      summary: 'Eliminado',
      detail: 'Grupo eliminado'
    });
  }

  // 🔹 Abrir detalle del grupo
  openGroup(id: number) {
    this.router.navigate(['/groups', id]);
  }

}