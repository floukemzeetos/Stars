import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api';

const CHAVE_SESSAO = 'cliente_logado';

@Injectable({ providedIn: 'root' })
export class ClienteApi {
  private http = inject(HttpClient);

  cadastrar(dados: { nome: string; documento: string; email: string; senha: string }): Observable<any> {
    return this.http.post<any>(`${API_URL}/clientes/cadastro`, dados);
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/clientes/login`, { email, senha });
  }

  buscarCliente(codigo: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/clientes/${codigo}`);
  }

  atualizarCliente(codigo: number, dados: { nome: string; telefone: string; logradouro: string }): Observable<any> {
    return this.http.put<any>(`${API_URL}/clientes/${codigo}`, dados);
  }

  recuperarSenha(email: string): Observable<{ mensagem: string }> {
    return this.http.post<{ mensagem: string }>(`${API_URL}/clientes/recuperar-senha`, { email });
  }

  // Define a nova senha usando o token recebido por e-mail
  redefinirSenha(token: string, novaSenha: string): Observable<{ mensagem: string }> {
    return this.http.post<{ mensagem: string }>(`${API_URL}/clientes/redefinir-senha`, { token, senha: novaSenha });
  }

  // Sessão simples no navegador (sem SSR neste projeto).
  clienteLogado(): any | null {
    const json = localStorage.getItem(CHAVE_SESSAO);
    return json ? JSON.parse(json) : null;
  }

  salvarClienteLogado(cliente: any): void {
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify(cliente));
  }

  sair(): void {
    localStorage.removeItem(CHAVE_SESSAO);
  }
}
