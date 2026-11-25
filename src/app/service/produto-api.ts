import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { API_URL } from './api';
import { CatalogoLocal } from './catalogo-local';

@Injectable({ providedIn: 'root' })
export class ProdutoApi {
  private http = inject(HttpClient);
  private local = inject(CatalogoLocal);

  // Lista de uma seção do site, ex.: 'eletro/listaEletronicos'.
  // Se o back-end não tiver a seção, usa o catálogo local.
  listarSecao(secao: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/produtos`, { params: { secao } }).pipe(
      catchError(() => of([] as any[])),
      switchMap(lista => (lista?.length ? of(lista) : this.local.secao(secao)))
    );
  }

  // Busca por nome ou código do produto (não pela descrição)
  pesquisar(termo: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/produtos`, { params: { busca: termo } }).pipe(
      catchError(() => of([] as any[])),
      switchMap(lista => (lista?.length ? of(lista) : this.local.pesquisar(termo)))
    );
  }

  // Um produto pelo código. Se o back-end não tiver, usa o catálogo local.
  buscar(codigo: string | number): Observable<any | null> {
    return this.http.get<any>(`${API_URL}/produtos/${codigo}`).pipe(
      catchError(() => of(null)),
      switchMap(produto => (produto ? of(produto) : this.local.buscar(codigo)))
    );
  }
}
