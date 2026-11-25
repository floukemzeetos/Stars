import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProdutoApi } from '../../service/produto-api';
import { CartService } from '../../service/cart';

type Ordenacao = 'relevancia' | 'menorPreco' | 'maiorPreco' | 'desconto' | 'nome';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-busca',
  templateUrl: './busca.html',
  styleUrl: './busca.css'
})
export class Busca implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private produtoApi = inject(ProdutoApi);
  private cd = inject(ChangeDetectorRef);
  public cart = inject(CartService);

  termo = '';
  termoNovo = '';
  resultados: any[] = [];
  carregando = false;
  erro = '';

  // Filtros e ordenação (aplicados sobre o resultado já carregado)
  ordenacao: Ordenacao = 'relevancia';
  soPromocao = false;
  soDisponivel = false;

  avisoCarrinho = '';

  private assinaturaRota?: Subscription;
  private assinaturaBusca?: Subscription;
  private temporizadorAviso?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.assinaturaRota = this.route.queryParamMap.subscribe(params => {
      this.termo = (params.get('q') ?? '').trim();
      this.termoNovo = this.termo;
      this.pesquisar();
    });
  }

  ngOnDestroy(): void {
    this.assinaturaRota?.unsubscribe();
    this.assinaturaBusca?.unsubscribe();
    if (this.temporizadorAviso) clearTimeout(this.temporizadorAviso);
  }

  refinar(): void {
    const texto = this.termoNovo.trim();
    if (!texto) return;
    this.router.navigate(['/busca'], { queryParams: { q: texto } });
  }

  limparFiltros(): void {
    this.soPromocao = false;
    this.soDisponivel = false;
    this.ordenacao = 'relevancia';
  }

  alternarPromocao(): void {
    this.soPromocao = !this.soPromocao;
  }

  alternarDisponivel(): void {
    this.soDisponivel = !this.soDisponivel;
  }

  // Lista exibida: filtros + ordenação aplicados sobre uma cópia
  exibidos(): any[] {
    let lista = this.resultados.slice();

    if (this.soPromocao) lista = lista.filter(p => this.temPromocao(p));
    if (this.soDisponivel) lista = lista.filter(p => p.quantidade > 0);

    switch (this.ordenacao) {
      case 'menorPreco':
        return lista.sort((a, b) => this.precoFinal(a) - this.precoFinal(b));
      case 'maiorPreco':
        return lista.sort((a, b) => this.precoFinal(b) - this.precoFinal(a));
      case 'desconto':
        return lista.sort((a, b) => this.percentual(b) - this.percentual(a));
      case 'nome':
        return lista.sort((a, b) => String(a.nome).localeCompare(String(b.nome), 'pt-BR'));
      default:
        return lista; // relevância: ordem original do back-end (código)
    }
  }

  temPromocao(p: any): boolean {
    return p.valorPromo > 0 && p.valorPromo < p.valor;
  }

  precoFinal(p: any): number {
    return this.temPromocao(p) ? p.valorPromo : p.valor;
  }

  percentual(p: any): number {
    if (!this.temPromocao(p)) return 0;
    return Math.round((1 - p.valorPromo / p.valor) * 100);
  }

  // Divide o nome em trechos para destacar o termo buscado
  partes(nome: string): { texto: string; marca: boolean }[] {
    const texto = String(nome ?? '');
    const termo = this.termo.trim();
    if (!termo) return [{ texto, marca: false }];

    const escapado = termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return texto
      .split(new RegExp(`(${escapado})`, 'i'))
      .filter(trecho => trecho !== '')
      .map(trecho => ({ texto: trecho, marca: trecho.toLowerCase() === termo.toLowerCase() }));
  }

  comprar(produto: any): void {
    this.cart.adicionar(produto);
    this.avisoCarrinho = `"${produto.nome}" foi adicionado ao carrinho.`;
    if (this.temporizadorAviso) clearTimeout(this.temporizadorAviso);
    this.temporizadorAviso = setTimeout(() => {
      this.avisoCarrinho = '';
      this.cd.detectChanges();
    }, 2500);
  }

  private pesquisar(): void {
    this.assinaturaBusca?.unsubscribe();
    this.resultados = [];
    this.erro = '';

    if (!this.termo) {
      this.carregando = false;
      return;
    }

    this.carregando = true;
    this.assinaturaBusca = this.produtoApi.pesquisar(this.termo).subscribe({
      next: lista => {
        this.resultados = lista;
        this.carregando = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.erro = 'Não foi possível buscar produtos. Tente novamente.';
        this.carregando = false;
        this.cd.detectChanges();
      }
    });
  }
}
