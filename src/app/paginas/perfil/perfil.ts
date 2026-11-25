import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClienteApi } from '../../service/cliente-api';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-perfil',
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {
  private clienteApi = inject(ClienteApi);
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef);

  cliente: any = null;
  editando = false;
  salvando = false;
  mensagem = '';
  erro = false;

  form = { nome: '', telefone: '', logradouro: '' };

  ngOnInit(): void {
    const logado = this.clienteApi.clienteLogado();
    if (!logado) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.mostrar(logado);

    // Busca os dados atuais no back-end (o localStorage pode estar desatualizado)
    this.clienteApi.buscarCliente(logado.codigo).subscribe({
      next: atual => {
        this.clienteApi.salvarClienteLogado(atual);
        this.mostrar(atual);
        this.cd.detectChanges();
      },
      error: () => {
        this.falha('Não foi possível atualizar seus dados. Exibindo os dados salvos.');
        this.cd.detectChanges();
      }
    });
  }

  iniciais(): string {
    if (!this.cliente?.nome) return '?';
    const partes = this.cliente.nome.trim().split(/\s+/);
    const primeira = partes[0]?.[0] ?? '';
    const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
    return (primeira + ultima).toUpperCase();
  }

  editar(): void {
    this.preencherFormulario();
    this.editando = true;
    this.mensagem = '';
  }

  cancelar(): void {
    this.editando = false;
    this.mensagem = '';
  }

  salvar(): void {
    if (!this.form.nome.trim()) {
      this.falha('Informe o nome.');
      return;
    }
    this.salvando = true;
    this.mensagem = '';

    this.clienteApi.atualizarCliente(this.cliente.codigo, {
      nome: this.form.nome,
      telefone: this.form.telefone,
      logradouro: this.form.logradouro
    }).subscribe({
      next: atualizado => {
        this.clienteApi.salvarClienteLogado(atualizado);
        this.mostrar(atualizado);
        this.salvando = false;
        this.editando = false;

        // Confere se o servidor gravou telefone e endereço que foram enviados
        const telefoneNaoGravou = !!this.form.telefone && atualizado?.telefone !== this.form.telefone;
        const enderecoNaoGravou = !!this.form.logradouro && atualizado?.logradouro !== this.form.logradouro;
        if (telefoneNaoGravou || enderecoNaoGravou) {
          this.falha('Os dados foram enviados, mas o servidor não guardou telefone e/ou endereço. Verifique o back-end.');
        } else {
          this.sucesso('Dados atualizados com sucesso.');
        }
        this.cd.detectChanges();
      },
      error: err => {
        this.salvando = false;
        this.falha(err?.error?.mensagem ?? 'Não foi possível salvar. Tente novamente.');
        this.cd.detectChanges();
      }
    });
  }

  sair(): void {
    this.clienteApi.sair();
    this.router.navigateByUrl('/');
  }

  private mostrar(cliente: any): void {
    this.cliente = cliente;
    this.preencherFormulario();
  }

  private preencherFormulario(): void {
    this.form = {
      nome: this.cliente?.nome ?? '',
      telefone: this.cliente?.telefone ?? '',
      logradouro: this.cliente?.logradouro ?? ''
    };
  }

  private sucesso(texto: string): void {
    this.mensagem = texto;
    this.erro = false;
  }

  private falha(texto: string): void {
    this.mensagem = texto;
    this.erro = true;
  }
}
