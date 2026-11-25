import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = signal<any[]>(this.obterCarrinhoSalvo());

  constructor() {
    effect(() => {
      localStorage.setItem('carrinho_compras', JSON.stringify(this.items()));
    });
  }

  // Calcula o total considerando o preço final multiplicado pela quantidade selecionada de cada item
  total = computed(() => {
    return this.items().reduce((acc, item) => {
      const precoFinal = item.valorPromo > 0 ? item.valorPromo : item.valor;
      const qtd = item.quantidadeSelecionada || 1;
      return acc + ((precoFinal || 0) * qtd);
    }, 0);
  });

  // Calcula o número total exato de unidades (peças) no carrinho para exibir na bolinha
  totalItens = computed(() => {
    return this.items().reduce((acc, item) => {
      return acc + (item.quantidadeSelecionada || 1);
    }, 0);
  });

  adicionar(produto: any) {
    this.items.update(listaAtual => {
      // Procura se o produto já existe no carrinho pelo código
      const index = listaAtual.findIndex(i => i.codigo === produto.codigo);

      if (index > -1) {
        // Se já existe, clona a lista e incrementa a quantidade
        const novaLista = [...listaAtual];
        const itemExistente = novaLista[index];
        novaLista[index] = {
          ...itemExistente,
          quantidadeSelecionada: (itemExistente.quantidadeSelecionada || 1) + 1
        };
        return novaLista;
      } else {
        // Se não existe, adiciona com quantidade inicial igual a 1
        return [...listaAtual, { ...produto, quantidadeSelecionada: 1 }];
      }
    });
  }

  aumentar(item: any) {
    this.items.update(listaAtual => {
      return listaAtual.map(i => {
        if (i.codigo === item.codigo) {
          return { ...i, quantidadeSelecionada: (i.quantidadeSelecionada || 1) + 1 };
        }
        return i;
      });
    });
  }

  diminuir(item: any) {
    this.items.update(listaAtual => {
      return listaAtual.map(i => {
        if (i.codigo === item.codigo) {
          const novaQtd = (i.quantidadeSelecionada || 1) - 1;
          return { ...i, quantidadeSelecionada: novaQtd > 0 ? novaQtd : 1 };
        }
        return i;
      });
    });
  }

  remover(index: number) {
    this.items.update(listaAtual => listaAtual.filter((_, i) => i !== index));
  }

  esvaziar() {
    this.items.set([]);
  }

  private obterCarrinhoSalvo(): any[] {
    const dados = localStorage.getItem('carrinho_compras');
    if (dados) {
      try {
        return JSON.parse(dados);
      } catch (e) {
        return [];
      }
    }
    return [];
  }
}