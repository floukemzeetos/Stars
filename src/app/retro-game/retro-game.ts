import { ProdutoApi } from '../service/produto-api';
import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../service/cart';

export interface RetroGameAgr {
  codigo: number;
  nome: string;
  descritivo: string;
  valor: number;
  valorPromo: number;
  quantidade: number;
  destaque: number;
  jogoConsole: string;
  possuiRetroCompartibilidade: string;
}

export interface RetroConsoleAgr {
  codigo: number;
  nome: string;
  descritivo: string;
  valor: number;
  valorPromo: number;
  quantidade: number;
  destaque: number;
  possuiRetroCompartibilidade: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-retro-game',
  styleUrl: './retro-game.css',
  templateUrl: './retro-game.html',
})
export class RetroGame implements OnInit {
  private cd = inject(ChangeDetectorRef);

  listaPromocoes: RetroGameAgr[] = [];

  listaLancamentos: RetroConsoleAgr[] = [];

  constructor(public cart: CartService,
    private router: Router, private produtoApi: ProdutoApi) {}

  ngOnInit(): void {
    this.carregarProdutos();}

  adicionarAoCarrinho(produto: RetroGameAgr | RetroConsoleAgr): void {
    this.cart.adicionar(produto);
  }

  abrirDetalhe(produto: RetroGameAgr | RetroConsoleAgr): void {
    this.router.navigate(['/detalhes', produto.codigo], {
      state: { produto }
    });
  }

  private carregarProdutos(): void {
    this.produtoApi.listarSecao('retro-game/listaPromocoes').subscribe(d => { this.listaPromocoes = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('retro-game/listaLancamentos').subscribe(d => { this.listaLancamentos = d; this.cd.markForCheck(); });
  }
}