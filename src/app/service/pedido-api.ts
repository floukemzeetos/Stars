import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api';

@Injectable({ providedIn: 'root' })
export class PedidoApi {
  private http = inject(HttpClient);

  criar(pedido: {
    codigoCliente: number;
    entrega: string;
    obs: string;
    itens: { codigoProduto: number; quantidade: number }[];
  }): Observable<any> {
    return this.http.post<any>(`${API_URL}/pedidos`, pedido);
  }

  listarDoCliente(codigoCliente: number): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/pedidos/cliente/${codigoCliente}`);
  }
}
