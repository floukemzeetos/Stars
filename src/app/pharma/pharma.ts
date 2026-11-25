import { ProdutoApi } from '../service/produto-api';
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SkyPharma } from '../model/sky-pharma';
import { CartService } from '../service/cart';

@Component({
  imports: [CommonModule],
  selector: 'app-pharma',
  styleUrl: './pharma.css',
  templateUrl: './pharma.html',
})
export class Pharma {
  private cd = inject(ChangeDetectorRef);

  lista: SkyPharma[] = [];

  constructor(public cart: CartService,
    private router: Router, private produtoApi: ProdutoApi) {}

  adicionarAoCarrinho(produto: any) {
    this.cart.adicionar(produto);
  }

  abrirDetalhe(produto: SkyPharma): void {
    this.router.navigate(['/detalhes', produto.codigo], {
      state: { produto }
    });
  }

  private carregarProdutos(): void {
    this.produtoApi.listarSecao('pharma/lista').subscribe(d => { this.lista = d; this.cd.markForCheck(); });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }
}