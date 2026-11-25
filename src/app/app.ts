import { Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { Subject, Subscription, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { CartService } from './service/cart';
import { ClienteApi } from './service/cliente-api';
import { ProdutoApi } from './service/produto-api';

// Quantos produtos aparecem na prévia da barra de pesquisa
const LIMITE_SUGESTOES = 3;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnDestroy {
  termo = '';
  usuario: any = null;

  // Prévia da busca (aparece enquanto o usuário digita)
  sugestoes: any[] = [];
  carregandoSugestoes = false;
  mostrarSugestoes = false;

  private termoDigitado = new Subject<string>();
  private assinaturas: Subscription[] = [];

  constructor(
    public cart: CartService,
    private router: Router,
    private clienteApi: ClienteApi,
    private produtoApi: ProdutoApi
  ) {
    this.usuario = this.clienteApi.clienteLogado();

    // Atualiza o "Olá, nome" a cada troca de página (ex.: depois do login)
    this.assinaturas.push(
      this.router.events.subscribe(evento => {
        if (evento instanceof NavigationEnd) {
          this.usuario = this.clienteApi.clienteLogado();
          this.fecharSugestoes();
        }
      })
    );

    // Prévia: espera a pessoa parar de digitar e consulta o back-end
    this.assinaturas.push(
      this.termoDigitado.pipe(
        debounceTime(250),
        distinctUntilChanged(),
        switchMap(texto => {
          if (!texto) {
            return of<any[]>([]);
          }
          this.carregandoSugestoes = true;
          return this.produtoApi.pesquisar(texto).pipe(catchError(() => of<any[]>([])));
        })
      ).subscribe(lista => {
        this.sugestoes = lista.slice(0, LIMITE_SUGESTOES);
        this.carregandoSugestoes = false;
        this.mostrarSugestoes = this.termo.trim().length > 0;
      })
    );
  }

  ngOnDestroy(): void {
    this.assinaturas.forEach(a => a.unsubscribe());
  }

  aoDigitar(valor: string): void {
    this.termo = valor;
    this.termoDigitado.next(valor.trim());
  }

  abrirSugestoes(): void {
    this.mostrarSugestoes = this.termo.trim().length > 0;
  }

  fecharSugestoes(): void {
    this.mostrarSugestoes = false;
  }

  // Fecha a prévia ao clicar em qualquer lugar fora da barra de pesquisa
  @HostListener('document:click', ['$event'])
  aoClicarFora(evento: Event): void {
    const alvo = evento.target as HTMLElement | null;
    if (alvo && !alvo.closest('.pesquisa')) {
      this.fecharSugestoes();
    }
  }

  buscar(): void {
    const texto = this.termo.trim();
    this.fecharSugestoes();
    if (!texto) return;
    this.router.navigate(['/busca'], { queryParams: { q: texto } });
  }

  sair() {
    this.clienteApi.sair();
    this.usuario = null;
    this.router.navigateByUrl('/');
  }

  isAuthRoute(): boolean {
    const url = this.router.url;
    return url.includes('/login') || url.includes('/cadastro') || url.includes('/recuperarSenha') || url.includes('/redefinir-senha') || url.includes('/em-manutencao')
    || url.includes('/em-construcao');
  }
}
