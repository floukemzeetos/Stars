import { ProdutoApi } from '../service/produto-api';
import { Component, ChangeDetectorRef, inject } from '@angular/core';

import { Livros } from '../model/livros';

import { CommonModule } from '@angular/common';

import { CartService } from '../service/cart';

import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-livraria',
  styleUrl: './livraria.css',
  templateUrl: './livraria.html',
})
export class Livraria {
  private cd = inject(ChangeDetectorRef);

  lista: Livros[] = [];

  constructor(public cart: CartService,
    private router: Router, private produtoApi: ProdutoApi) {}

  adicionarAoCarrinho(produto: any): void {
    this.cart.adicionar(produto);
  }

  abrirDetalhe(codigo: number, produto?: any): void {
    this.router.navigate(['/detalhes', codigo], { state: { produto } });
  }

  private carregarProdutos(): void {
    this.produtoApi.listarSecao('livraria/lista').subscribe(d => { this.lista = d; this.cd.markForCheck(); });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }
}