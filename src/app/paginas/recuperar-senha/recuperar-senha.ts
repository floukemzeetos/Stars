import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ClienteApi } from '../../service/cliente-api';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.html',
  styleUrl: './recuperar-senha.css'
})
export class RecuperarSenha {
  email = '';
  mensagem = '';
  enviando = false;

  constructor(private clienteApi: ClienteApi) {}

  recuperar() {
    this.mensagem = '';
    this.enviando = true;

    this.clienteApi.recuperarSenha(this.email).subscribe({
      next: res => {
        this.mensagem = res.mensagem;
        this.enviando = false;
      },
      error: err => {
        this.mensagem = err?.error?.mensagem ?? 'Não foi possível processar. Tente novamente.';
        this.enviando = false;
      }
    });
  }
}
