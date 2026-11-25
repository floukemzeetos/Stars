import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClienteApi } from '../../service/cliente-api';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  senha = '';
  mensagem = '';
  enviando = false;

  constructor(private clienteApi: ClienteApi, private router: Router) {}

  entrar() {
    this.mensagem = '';
    this.enviando = true;

    this.clienteApi.login(this.email, this.senha).subscribe({
      next: cliente => {
        this.clienteApi.salvarClienteLogado(cliente);
        this.router.navigateByUrl('/');
      },
      error: err => {
        this.mensagem = err?.error?.mensagem ?? 'Não foi possível entrar. Tente novamente.';
        this.enviando = false;
      }
    });
  }
}
