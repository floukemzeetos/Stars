import { Injectable } from '@angular/core';

export interface Produto {
  codigo: number | string;
  nome: string;
  descritivo?: string;
  descricao?: string;
  valor?: number;
  valorPromo?: number;
  quantidade?: number;
  destaque?: number;
  categoria?: string;
  subcategoria?: string;
  marca?: string;
  [chave: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class DetalhesProdutosService {

  normalizarProduto(produto: any): Produto {
    if (!produto) {
      return {
        codigo: '',
        nome: ''
      };
    }

    return {
      ...produto,

      codigo: produto.codigo ?? produto.id ?? '',

      nome:
        produto.nome ??
        produto.titulo ??
        produto.name ??
        'Produto sem nome',

      descritivo:
        produto.descritivo ??
        produto.descricao ??
        produto.description ??
        ''
    };
  }

  encontrarProduto(
    produtos: any[],
    codigo: string | number
  ): Produto | null {

    if (!Array.isArray(produtos)) {
      return null;
    }

    const codigoString = String(codigo);

    const encontrado = produtos.find(produto => {

      if (!produto) {
        return false;
      }

      return String(
        produto.codigo ??
        produto.id ??
        ''
      ) === codigoString;

    });

    if (!encontrado) {
      return null;
    }

    return this.normalizarProduto(encontrado);
  }

  extrairProdutos(dados: any): Produto[] {

    if (!dados) {
      return [];
    }

    if (Array.isArray(dados)) {

      return dados
        .filter(item =>
          item &&
          (
            item.codigo !== undefined ||
            item.id !== undefined
          )
        )
        .map(item =>
          this.normalizarProduto(item)
        );
    }

    if (typeof dados !== 'object') {
      return [];
    }

    const produtos: Produto[] = [];

    Object.values(dados).forEach(valor => {

      if (Array.isArray(valor)) {

        valor.forEach(item => {

          if (
            item &&
            (
              item.codigo !== undefined ||
              item.id !== undefined
            )
          ) {

            produtos.push(
              this.normalizarProduto(item)
            );

          } else if (
            item &&
            typeof item === 'object'
          ) {

            produtos.push(
              ...this.extrairProdutos(item)
            );

          }

        });

      } else if (
        valor &&
        typeof valor === 'object'
      ) {

        produtos.push(
          ...this.extrairProdutos(valor)
        );

      }

    });

    return produtos;
  }

  encontrarEmDados(
    dados: any,
    codigo: string | number
  ): Produto | null {

    const produtos =
      this.extrairProdutos(dados);

    return this.encontrarProduto(
      produtos,
      codigo
    );
  }

  obterCaracteristicas(
    produto: Produto
  ): {
    chave: string;
    nome: string;
    valor: any;
  }[] {

    if (!produto) {
      return [];
    }

    const camposIgnorados = [
      'codigo',
      'id',
      'nome',
      'titulo',
      'name',
      'descritivo',
      'descricao',
      'description',
      'valor',
      'valorPromo'
    ];

    return Object.keys(produto)

      .filter(chave =>
        !camposIgnorados.includes(chave)
      )

      .filter(chave =>
        produto[chave] !== null &&
        produto[chave] !== undefined &&
        produto[chave] !== ''
      )

      .map(chave => ({
        chave,
        nome: this.formatarNomeCampo(chave),
        valor: produto[chave]
      }));
  }

  formatarNomeCampo(
    campo: string
  ): string {

    const nomes: Record<string, string> = {

      codigo: 'Código',

      marca: 'Marca',

      categoria: 'Categoria',

      subcategoria: 'Subcategoria',

      quantidade: 'Quantidade em estoque',

      destaque: 'Destaque',

      peso: 'Peso',

      tecido: 'Material / Tecido',

      material: 'Material',

      generoMusical: 'Gênero Musical',

      generoFilme: 'Gênero do Filme',

      quantidade_comprimidos:
        'Quantidade de comprimidos',

      dosagem: 'Dosagem',

      voltagem: 'Voltagem',

      capacidade: 'Capacidade',

      tamanho: 'Tamanho',

      cor: 'Cor',

      autor: 'Autor',

      editora: 'Editora',

      ano: 'Ano',

      paginas: 'Páginas',

      fabricante: 'Fabricante',

      modelo: 'Modelo',

      dimensoes: 'Dimensões',

      dimensao: 'Dimensão',

      potencia: 'Potência',

      memoria: 'Memória',

      armazenamento: 'Armazenamento',

      tela: 'Tela',

      processador: 'Processador',

      sistemaOperacional:
        'Sistema Operacional'

    };

    if (nomes[campo]) {
      return nomes[campo];
    }

    return campo

      .replace(/\_/g, ' ')

      .replace(/([A-Z])/g, ' $1')

      .replace(/^./, letra =>
        letra.toUpperCase()
      )

      .trim();
  }

  possuiPromocao(
    produto: Produto
  ): boolean {

    if (
      produto.valor === undefined ||
      produto.valorPromo === undefined
    ) {
      return false;
    }

    return (
      produto.valorPromo > 0 &&
      produto.valorPromo < produto.valor
    );
  }

  calcularDesconto(
    produto: Produto
  ): number {

    if (
      !this.possuiPromocao(produto)
    ) {
      return 0;
    }

    if (!produto.valor) {
      return 0;
    }

    const desconto =
      (
        (produto.valor -
          produto.valorPromo!) /
        produto.valor
      ) * 100;

    return Math.round(desconto);
  }
}