import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';

// Seções genéricas ("lista", "lista2", ...) de cada página, ligadas à chave do totalLista.json.
// Seções com nome próprio (ex.: 'gamer/listaJogos') usam o nome depois da barra.
const MAPA_SECOES: Record<string, string> = {
  'vitrine/lista': 'lista9',
  'pharma/lista': 'lista5',
  'casa-mesa-banho/lista': 'lista',
  'discos/lista': 'lista2',
  'filmes-antigos/lista': 'lista3',
  'livraria/lista': 'lista4',
  'retro/lista': 'lista7',
  'retro-comum/lista': 'lista8',
  'produtos-premium/lista': 'lista6'
};

// Catálogo completo embutido no site (assets/json/totalLista.json).
// Serve de reserva quando o back-end não devolve a seção ou o produto.
@Injectable({ providedIn: 'root' })
export class CatalogoLocal {
  private http = inject(HttpClient);

  private dados$ = this.http
    .get<Record<string, any[]>>('assets/json/totalLista.json')
    .pipe(shareReplay(1));

  secao(secao: string): Observable<any[]> {
    const chave = MAPA_SECOES[secao] ?? secao.split('/').pop() ?? secao;
    return this.dados$.pipe(map(dados => dados[chave] ?? []));
  }

  pesquisar(termo: string): Observable<any[]> {
    const t = termo.trim().toLowerCase();
    return this.todos().pipe(
      map(lista => {
        const vistos = new Set<string>();
        return lista.filter(p => {
          const casa = String(p.nome ?? '').toLowerCase().includes(t) || String(p.codigo) === t;
          const chave = `${p.codigo}|${p.nome}`;
          if (!casa || vistos.has(chave)) return false;
          vistos.add(chave);
          return true;
        });
      })
    );
  }

  buscar(codigo: string | number): Observable<any | null> {
    return this.todos().pipe(
      map(lista => lista.find(p => String(p.codigo) === String(codigo)) ?? null)
    );
  }

  private todos(): Observable<any[]> {
    return this.dados$.pipe(map(dados => Object.values(dados).flat()));
  }
}
