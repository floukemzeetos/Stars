import { ProdutoApi } from '../service/produto-api';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { EletroProdutos } from '../model/eletro-produtos';
import { CartService } from '../service/cart';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  selector: 'app-eletro',
  styleUrl: './eletro.css',
  templateUrl: './eletro.html',
})
export class EletroComponent {
  private cd = inject(ChangeDetectorRef);

  listaEletrodomestico: EletroProdutos[] = [];

  listaEletronicos: EletroProdutos[] = [];

  listaMobile: EletroProdutos[] = [];

  listaEscritorio: EletroProdutos[] = [];

  constructor(public cart: CartService, private produtoApi: ProdutoApi) {}

  adicionarAoCarrinho(produto: EletroProdutos): void {
    this.cart.adicionar(produto);
  }

  private carregarProdutos(): void {
    this.produtoApi.listarSecao('eletro/listaEletrodomestico').subscribe(d => { this.listaEletrodomestico = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('eletro/listaEletronicos').subscribe(d => { this.listaEletronicos = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('eletro/listaMobile').subscribe(d => { this.listaMobile = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('eletro/listaEscritorio').subscribe(d => { this.listaEscritorio = d; this.cd.markForCheck(); });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }
}