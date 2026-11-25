import { ProdutoApi } from '../service/produto-api';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../service/cart';

export class GamesProdutos {
  codigo: number = 0;
  nome: string = "";
  descritivo: string = "";
  valor: number = 0;
  valorPromo: number = 0;
  quantidade: number = 0;
  destaque: number = 0;
  jogoConsole: string = "";
  possuiRetroCompartibilidade: string = "";
  categoria: string = "";
  subcategoria: string = "";
  marca: string = "";
}

export class ConsolesProdutos {
  codigo: number = 0;
  nome: string = "";
  descritivo: string = "";
  valor: number = 0;
  valorPromo: number = 0;
  quantidade: number = 0;
  destaque: number = 0;
  categoria: string = "";
  subcategoria: string = "";
  marca: string = "";
}

export class HardwareProdutos {
  codigo: number = 0;
  nome: string = "";
  descritivo: string = "";
  valor: number = 0;
  valorPromo: number = 0;
  quantidade: number = 0;
  destaque: number = 0;
  categoria: string = "";
  subcategoria: string = "";
  marca: string = "";
}

export class PerifericosProdutos {
  codigo: number = 0;
  nome: string = "";
  descritivo: string = "";
  valor: number = 0;
  valorPromo: number = 0;
  quantidade: number = 0;
  destaque: number = 0;
  categoria: string = "";
  subcategoria: string = "";
  marca: string = "";
}

export class PcGamerProdutos {
  codigo: number = 0;
  nome: string = "";
  descritivo: string = "";
  valor: number = 0;
  valorPromo: number = 0;
  quantidade: number = 0;
  destaque: number = 0;
  categoria: string = "";
  subcategoria: string = "";
  marca: string = "";
}

export class NotebookGamerProdutos {
  codigo: number = 0;
  nome: string = "";
  descritivo: string = "";
  valor: number = 0;
  valorPromo: number = 0;
  quantidade: number = 0;
  destaque: number = 0;
  categoria: string = "";
  subcategoria: string = "";
  marca: string = "";
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-gamer',
  styleUrl: './gamer.css',
  templateUrl: './gamer.html',
})
export class Gamer {
  private cd = inject(ChangeDetectorRef);

  listaJogos: GamesProdutos[] = [];

  listaConsoles: ConsolesProdutos[] = [];

  listaHardware: HardwareProdutos[] = [];

  listaPerifericos: PerifericosProdutos[] = [];

  listaPcGamer: PcGamerProdutos[] = [];

  listaNotebookGamer: NotebookGamerProdutos[] = [];

  constructor(public cart: CartService,
    private router: Router, private produtoApi: ProdutoApi) {}

  adicionarAoCarrinho(produto: any): void {
    this.cart.adicionar(produto);
  }

  abrirDetalhe(codigo: number, produto?: any): void {
    this.router.navigate(['/detalhes', codigo], { state: { produto } });
  }

  private carregarProdutos(): void {
    this.produtoApi.listarSecao('gamer/listaJogos').subscribe(d => { this.listaJogos = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('gamer/listaConsoles').subscribe(d => { this.listaConsoles = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('gamer/listaHardware').subscribe(d => { this.listaHardware = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('gamer/listaPerifericos').subscribe(d => { this.listaPerifericos = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('gamer/listaPcGamer').subscribe(d => { this.listaPcGamer = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('gamer/listaNotebookGamer').subscribe(d => { this.listaNotebookGamer = d; this.cd.markForCheck(); });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }
}