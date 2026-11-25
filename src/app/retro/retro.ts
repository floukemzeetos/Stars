import { ProdutoApi } from '../service/produto-api';
import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { RetroProduto } from '../model/retro-produto';

import { CartService } from '../service/cart';

@Component({

  imports: [CommonModule],

  selector: 'app-retro',

  styleUrl: './retro.css',

  templateUrl: './retro.html',

})

export class Retro implements OnInit {
  private cd = inject(ChangeDetectorRef);

  lista: RetroProduto[] = [];

  listaFiltrada: RetroProduto[] = [];

  categorias: string[] = [];

  categoriaAtiva: string = 'Todos';

  constructor(
    public cart: CartService,
    private router: Router,
    private produtoApi: ProdutoApi
  ) {}

  ngOnInit() {
    this.produtoApi.listarSecao('retro/lista').subscribe(dados => {
      this.lista = dados;
      this.listaFiltrada = [...dados];
      this.cd.markForCheck();

      const subcategoriasUnicas = new Set(dados.map(item => item.subcategoria));
      this.categorias = ['Todos', ...Array.from(subcategoriasUnicas)];
    });
  }

  filtrarPorCategoria(categoria: string) {

    this.categoriaAtiva = categoria;

    if (categoria === 'Todos') {

      this.listaFiltrada = [...this.lista];

    } else {

      this.listaFiltrada = this.lista.filter(
        item => item.subcategoria === categoria
      );

    }

  }

  adicionarAoCarrinho(produto: RetroProduto) {

    this.cart.adicionar(produto);

  }

  abrirDetalhe(produto: RetroProduto): void {

    this.router.navigate(['/detalhes', produto.codigo], {
      state: { produto }
    });

  }

}