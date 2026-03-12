import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  standalone: true,
  providers: [MessageService],
  imports: [
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    ToastModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {

  users: any[] = [];
  groups: any[] = [];

  user: any = this.resetUser();

  dialogVisible = false;
  editing = false;

  constructor(private message: MessageService) {}

  ngOnInit() {
    this.loadUsers();
    this.loadGroups();
  }

  resetUser() {
    return {
      id: '',
      nombre: '',
      grupo: '',
      fechaRegistro: ''
    };
  }

  loadUsers() {
    const data = localStorage.getItem('users');
    this.users = data ? JSON.parse(data) : [];
  }

  loadGroups() {
    const data = localStorage.getItem('groups');
    this.groups = data ? JSON.parse(data) : [];
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  newUser() {
    this.user = this.resetUser();
    this.editing = false;
    this.dialogVisible = true;
  }

  editUser(u: any) {
    this.user = { ...u };
    this.editing = true;
    this.dialogVisible = true;
  }

  saveUser() {

    if (!this.user.nombre || !this.user.grupo) {
      this.message.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Nombre y grupo son obligatorios'
      });
      return;
    }

    if (this.editing) {

      const index = this.users.findIndex(x => x.id === this.user.id);
      this.users[index] = this.user;

      this.message.add({
        severity: 'success',
        summary: 'Actualizado',
        detail: 'Usuario actualizado'
      });

    } else {

      this.user.id = Date.now();
      this.user.fechaRegistro = new Date().toLocaleDateString();

      this.users.push(this.user);

      this.message.add({
        severity: 'success',
        summary: 'Creado',
        detail: 'Usuario registrado'
      });
    }

    this.saveUsers();
    this.dialogVisible = false;
  }

  deleteUser(u: any) {

    this.users = this.users.filter(x => x.id !== u.id);
    this.saveUsers();

    this.message.add({
      severity: 'warn',
      summary: 'Eliminado',
      detail: 'Usuario eliminado'
    });
  }
}