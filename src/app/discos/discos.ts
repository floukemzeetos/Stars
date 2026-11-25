import { ProdutoApi } from '../service/produto-api';
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RetroDiscos } from '../model/retro-discos';
import { CartService } from '../service/cart';

@Component({
  selector: 'app-discos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './discos.html',
  styleUrl: './discos.css'
})
export class DiscosComponent {
  private cd = inject(ChangeDetectorRef);

  lista: RetroDiscos[] = [];

  constructor(public cart: CartService, private produtoApi: ProdutoApi) {}

  adicionarAoCarrinho(produto: RetroDiscos): void {
    this.cart.adicionar(produto);
  }

  private carregarProdutos(): void {
    this.produtoApi.listarSecao('discos/lista').subscribe(d => { this.lista = d; this.cd.markForCheck(); });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }
} 