import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClienteApi } from '../../service/cliente-api';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.html',
  styleUrl: '../recuperar-senha/recuperar-senha.css'
})
export class RedefinirSenha implements OnInit {
  private route = inject(ActivatedRoute);
  private clienteApi = inject(ClienteApi);
  private cd = inject(ChangeDetectorRef);

  token = '';
  novaSenha = '';
  confirmarSenha = '';

  mensagem = '';
  erro = false;
  enviando = false;
  concluido = false;

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    if (!this.token) {
      this.falha('Link inválido. Solicite uma nova recuperação de senha.');
    }
  }

  redefinir(): void {
    this.mensagem = '';

    if (!this.token) {
      this.falha('Link inválido. Solicite uma nova recuperação de senha.');
      return;
    }
    if (this.novaSenha.length < 6) {
      this.falha('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (this.novaSenha !== this.confirmarSenha) {
      this.falha('As senhas não coincidem.');
      return;
    }

    this.enviando = true;
    this.clienteApi.redefinirSenha(this.token, this.novaSenha).subscribe({
      next: res => {
        this.concluido = true;
        this.enviando = false;
        this.mensagem = res?.mensagem ?? 'Senha redefinida com sucesso.';
        this.erro = false;
        this.cd.markForCheck();
      },
      error: err => this.falha(err?.error?.mensagem ?? 'Não foi possível redefinir a senha. O link pode ter expirado.')
    });
  }

  private falha(texto: string): void {
    this.mensagem = texto;
    this.erro = true;
    this.enviando = false;
    this.cd.markForCheck();
  }
}
