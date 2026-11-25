import { ProdutoApi } from '../service/produto-api';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProdNatural } from '../model/prod-natural';
import { CartService } from '../service/cart';

@Component({
  imports: [CommonModule],
  selector: 'app-produtos-premium',
  styleUrl: './produtos-premium.css',
  templateUrl: './produtos-premium.html',
})
export class ProdutosPremium {
  private cd = inject(ChangeDetectorRef);

  lista: ProdNatural[] = [];

  constructor(public cart: CartService,
    private router: Router, private produtoApi: ProdutoApi) {}

  adicionarAoCarrinho(produto: any) {
    this.cart.adicionar(produto);
  }

  abrirDetalhe(produto: ProdNatural): void {
    this.router.navigate(['/detalhes', produto.codigo], {
      state: { produto }
    });
  }

  private carregarProdutos(): void {
    this.produtoApi.listarSecao('produtos-premium/lista').subscribe(d => { this.lista = d; this.cd.markForCheck(); });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }
}