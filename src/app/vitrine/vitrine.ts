import { ProdutoApi } from '../service/produto-api';
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Promocoes } from '../model/promocoes';

import { CartService } from '../service/cart';

import { Router } from '@angular/router';

@Component({
  selector: 'app-vitrine',
  imports: [CommonModule],
  styleUrl: './vitrine.css',
  templateUrl: './vitrine.html',
})
export class Vitrine implements AfterViewInit, OnDestroy {
  private cd = inject(ChangeDetectorRef);

  lista: Promocoes[] = [];

  @ViewChild('meuSlider') sliderRef!: ElementRef;

  intervalo: any;

  constructor(public cart: CartService,
    private router: Router, private produtoApi: ProdutoApi) {}

  adicionarAoCarrinho(produto: any) {
    this.cart.adicionar(produto);
  }

  abrirDetalhe(produto: Promocoes): void {
    this.router.navigate(['/detalhes', produto.codigo], {
      state: { produto }
    });
  }

  ngAfterViewInit() {
    this.iniciarCarrossel();
  }

  iniciarCarrossel() {
    if (!this.sliderRef) return;

    const slider = this.sliderRef.nativeElement;

    this.intervalo = setInterval(() => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;

      if (slider.scrollLeft >= maxScroll - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollTo({
          left: slider.scrollLeft + slider.clientWidth,
          behavior: 'smooth'
        });
      }
    }, 5000);
  }

  pausarCarrossel() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  ngOnDestroy() {
    this.pausarCarrossel();
  }

  private carregarProdutos(): void {
    this.produtoApi.listarSecao('vitrine/lista').subscribe(d => { this.lista = d; this.cd.markForCheck(); });
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }
}