import { ProdutoApi } from '../service/produto-api';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- Importante para o routerLink funcionar
import { CasaMesaBanhoProdutos } from '../model/casa-mesa-banho-produtos';
import { CartService } from '../service/cart';

@Component({
  imports: [CommonModule, RouterModule], // <-- Adicionado aqui
  selector: 'app-casa-mesa-banho',
  styleUrl: './casa-mesa-banho.css',
  templateUrl: './casa-mesa-banho.html',
})
export class CasaMesaBanho {
  private cd = inject(ChangeDetectorRef);
  lista: CasaMesaBanhoProdutos[] = [];

  constructor(public cart: CartService, private produtoApi: ProdutoApi) {}

  adicionarAoCarrinho(produto: any) {
    this.cart.adicionar(produto);
  }

  private carregarProdutos(): void {
    this.produtoApi.listarSecao('casa-mesa-banho/lista').subscribe(d => { this.lista = d; this.cd.markForCheck(); });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }
}