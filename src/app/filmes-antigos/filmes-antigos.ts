import { ProdutoApi } from '../service/produto-api';
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { Router } from '@angular/router';

import { FilmesAntigosProdutos } from '../model/filmes-antigos-produtos';
import { CartService } from '../service/cart';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-filmes-antigos',
  styleUrl: './filmes-antigos.css',
  templateUrl: './filmes-antigos.html',
})
export class FilmesAntigos {
  private cd = inject(ChangeDetectorRef);

  lista: FilmesAntigosProdutos[] = [];

  constructor(public cart: CartService,
    private router: Router, private produtoApi: ProdutoApi) {}

  adicionarAoCarrinho(produto: FilmesAntigosProdutos): void {
    this.cart.adicionar(produto);
  }

  abrirDetalhe(codigo: number, produto?: any): void {
    this.router.navigate(['/detalhes', codigo], { state: { produto } });
  }

  private carregarProdutos(): void {
    this.produtoApi.listarSecao('filmes-antigos/lista').subscribe(d => { this.lista = d; this.cd.markForCheck(); });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }
}