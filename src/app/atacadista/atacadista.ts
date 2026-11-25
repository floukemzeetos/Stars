import { ProdutoApi } from '../service/produto-api';
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../service/cart';

export class AtacadistaHortifruti {
    codigo: number = 0;
    nome: string = "";
    descritivo: string = '';
    valor: number = 0;
    valorPromo: number = 0;
    quantidade: number = 0;
    destaque: number = 0;
    categoria: string = "";
    subcategoria: string = "";
    marca: string = "";
    peso: number = 0;
}

export class atacadista {
  constructor(public cart: CartService) {}
}

export class AtacadistaGraos {
    codigo: number = 0;
    nome: string = "";
    descritivo: string = '';
    valor: number = 0;
    valorPromo: number = 0;
    quantidade: number = 0;
    destaque: number = 0;
    categoria: string = "";
    subcategoria: string = "";
    marca: string = "";
    peso: number = 0;
}

export class AtacadistaBiscoitoBolacha {
    codigo: number = 0;
    nome: string = "";
    descritivo: string = '';
    valor: number = 0;
    valorPromo: number = 0;
    quantidade: number = 0;
    destaque: number = 0;
    categoria: string = "";
    subcategoria: string = "";
    marca: string = "";
}

export class AtacadistaFriosRefrigerados {
    codigo: number = 0;
    nome: string = "";
    descritivo: string = '';
    valor: number = 0;
    valorPromo: number = 0;
    quantidade: number = 0;
    destaque: number = 0;
    categoria: string = "";
    subcategoria: string = "";
    marca: string = "";
    peso: number = 0;
}

export class AtacadistaRefrigerantes {
    codigo: number = 0;
    nome: string = "";
    descritivo: string = '';
    valor: number = 0;
    valorPromo: number = 0;
    quantidade: number = 0;
    destaque: number = 0;
    categoria: string = "";
    subcategoria: string = "";
    marca: string = "";
}

export class AtacadistaSalgados {
    codigo: number = 0;
    nome: string = "";
    descritivo: string = '';
    valor: number = 0;
    valorPromo: number = 0;
    quantidade: number = 0;
    destaque: number = 0;
    categoria: string = "";
    subcategoria: string = "";
    marca: string = "";
    peso: number = 0;
}

export class AtacadistaAcougue {
    codigo: number = 0;
    nome: string = "";
    descritivo: string = '';
    valor: number = 0;
    valorPromo: number = 0;
    quantidade: number = 0;
    destaque: number = 0;
    categoria: string = "";
    subcategoria: string = "";
    marca: string = "";
}

export class AtacadistaPadarias {
    codigo: number = 0;
    nome: string = "";
    descritivo: string = '';
    valor: number = 0;
    valorPromo: number = 0;
    quantidade: number = 0;
    destaque: number = 0;
    categoria: string = "";
    subcategoria: string = "";
    marca: string = "";
    peso: number = 0;
}

export class AtacadistaFrios {
    codigo: number = 0;
    nome: string = "";
    descritivo: string = '';
    valor: number = 0;
    valorPromo: number = 0;
    quantidade: number = 0;
    destaque: number = 0;
    categoria: string = "";
    subcategoria: string = "";
    marca: string = "";
}

export class AtacadistaHigienePessoal {
    codigo: number = 0;
    nome: string = "";
    descritivo: string = '';
    valor: number = 0;
    valorPromo: number = 0;
    quantidade: number = 0;
    destaque: number = 0;
    categoria: string = "";
    subcategoria: string = "";
    marca: string = "";
    peso: number = 0;
}

export class AtacadistaProdutosLimpeza {
    codigo: number = 0;
    nome: string = "";
    descritivo: string = '';
    valor: number = 0;
    valorPromo: number = 0;
    quantidade: number = 0;
    destaque: number = 0;
    categoria: string = "";
    subcategoria: string = "";
    marca: string = "";
}

@Component({
  selector: 'app-atacadista',
  imports: [CommonModule, RouterModule],
  templateUrl: './atacadista.html',
  styleUrl: './atacadista.css'
})
export class AtacadistaComponent {
  private cd = inject(ChangeDetectorRef);
  
  listaHortifruti: AtacadistaHortifruti[] = [];

  listaGraos: AtacadistaGraos[] = [];

  listaBiscoitos: AtacadistaBiscoitoBolacha[] = [];

  listaFriosRefrigerados: AtacadistaFriosRefrigerados[] = [];

  listaRefrigerantes: AtacadistaRefrigerantes[] = [];

  listaSalgados: AtacadistaSalgados[] = [];

  // Nome limpo e sem cedilha para evitar qualquer erro de parser do Angular
  listaCarnes: AtacadistaAcougue[] = [];

  listaPadarias: AtacadistaPadarias[] = [];

  listaFrios: AtacadistaFrios[] = [];

  listaHigienePessoal: AtacadistaHigienePessoal[] = [];

  listaProdutosLimpeza: AtacadistaProdutosLimpeza[] = [];

  constructor(public cart: CartService, private produtoApi: ProdutoApi) {}

  adicionarAoCarrinho(produto: any) {
    this.cart.adicionar(produto);
  }

  private carregarProdutos(): void {
    this.produtoApi.listarSecao('atacadista/listaHortifruti').subscribe(d => { this.listaHortifruti = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('atacadista/listaGraos').subscribe(d => { this.listaGraos = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('atacadista/listaBiscoitos').subscribe(d => { this.listaBiscoitos = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('atacadista/listaFriosRefrigerados').subscribe(d => { this.listaFriosRefrigerados = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('atacadista/listaRefrigerantes').subscribe(d => { this.listaRefrigerantes = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('atacadista/listaSalgados').subscribe(d => { this.listaSalgados = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('atacadista/listaCarnes').subscribe(d => { this.listaCarnes = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('atacadista/listaPadarias').subscribe(d => { this.listaPadarias = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('atacadista/listaFrios').subscribe(d => { this.listaFrios = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('atacadista/listaHigienePessoal').subscribe(d => { this.listaHigienePessoal = d; this.cd.markForCheck(); });
    this.produtoApi.listarSecao('atacadista/listaProdutosLimpeza').subscribe(d => { this.listaProdutosLimpeza = d; this.cd.markForCheck(); });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }
}