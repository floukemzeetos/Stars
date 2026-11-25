import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClienteApi } from '../../service/cliente-api';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  nome = '';
  cpf = '';
  email = '';
  emailConfirma = '';
  senha = '';
  senhaConfirma = '';

  mensagem = '';
  erro = false;
  enviando = false;

  constructor(private clienteApi: ClienteApi, private router: Router) {}

  cadastrar() {
    this.mensagem = '';

    if (this.email.trim().toLowerCase() !== this.emailConfirma.trim().toLowerCase()) {
      this.falha('Os e-mails não coincidem.');
      return;
    }
    if (this.senha !== this.senhaConfirma) {
      this.falha('As senhas não coincidem.');
      return;
    }

    this.enviando = true;
    this.clienteApi.cadastrar({
      nome: this.nome,
      documento: this.cpf,
      email: this.email,
      senha: this.senha
    }).subscribe({
      next: cliente => {
        this.erro = false;
        this.enviando = false;
        this.mensagem = `Cadastro realizado! Seu código de cliente é ${cliente.codigo}. Você será levado para o login.`;
        setTimeout(() => this.router.navigateByUrl('/login'), 1500);
      },
      error: err => this.falha(err?.error?.mensagem ?? 'Não foi possível cadastrar. Tente novamente.')
    });
  }

  private falha(texto: string) {
    this.mensagem = texto;
    this.erro = true;
    this.enviando = false;
  }
}
