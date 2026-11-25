import { ProdutoApi } from '../service/produto-api';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PromocoesRetro } from '../model/promocoes-retro';
import { CartService } from '../service/cart';

@Component({
  imports: [CommonModule],
  selector: 'app-retro-comum',
  styleUrl: './retro-comum.css',
  templateUrl: './retro-comum.html',
})
export class RetroComum {
  private cd = inject(ChangeDetectorRef);

  lista: PromocoesRetro[] = [];

  constructor(public cart: CartService,
    private router: Router, private produtoApi: ProdutoApi) {}

  adicionarAoCarrinho(produto: PromocoesRetro): void {
    this.cart.adicionar(produto);
  }

  abrirDetalhe(produto: PromocoesRetro): void {
    this.router.navigate(['/detalhes', produto.codigo], {
      state: { produto }
    });
  }

  private carregarProdutos(): void {
    this.produtoApi.listarSecao('retro-comum/lista').subscribe(d => { this.lista = d; this.cd.markForCheck(); });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }
}