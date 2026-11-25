import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, CommonModule } from '@angular/common';

import { CartService } from '../service/cart';

import {
    DetalhesProdutosService,
    Produto
} from '../service/informacoes/detalhes-produtos';

import { ProdutoApi } from '../service/produto-api';

@Component({
    selector: 'app-detalhe',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './detalhe.html',
    styleUrls: ['./detalhe.css']
})
export class Detalhe implements OnInit {

    private route = inject(ActivatedRoute);
    private location = inject(Location);
    private detalhesProdutos = inject(DetalhesProdutosService);
    public cart = inject(CartService);
    private produtoApi = inject(ProdutoApi);
    private cd = inject(ChangeDetectorRef);

    codigoProduto: string | null = null;

    produto: Produto = {
        codigo: 0,
        nome: '',
        marca: '',
        categoria: '',
        subcategoria: '',
        valor: 0,
        valorPromo: 0,
        descricao: ''
    };

    caracteristicas: {
        chave: string;
        nome: string;
        valor: any;
    }[] = [];

    ngOnInit(): void {

        this.route.paramMap.subscribe(params => {

            this.codigoProduto = params.get('codigo');

            if (!this.codigoProduto) {
                return;
            }

            // Produto clicado na página de origem: mostra exatamente ele
            const selecionado = history.state?.produto;
            if (selecionado && String(selecionado.codigo) === this.codigoProduto) {
                this.mostrar(selecionado);
                return;
            }

            // Acesso direto pela URL: busca pelo código (back-end ou catálogo local)
            this.produtoApi.buscar(this.codigoProduto).subscribe({
                next: dados => dados ? this.mostrar(dados) : this.naoEncontrado(),
                error: () => this.naoEncontrado()
            });

        });

    }

    private mostrar(dados: any): void {
        this.produto = this.detalhesProdutos.normalizarProduto(dados);
        this.caracteristicas = this.detalhesProdutos.obterCaracteristicas(this.produto);
        this.cd.markForCheck();
    }

    private naoEncontrado(): void {
        this.produto = {
            codigo: Number(this.codigoProduto),
            nome: 'Produto não encontrado',
            marca: '',
            categoria: '',
            subcategoria: '',
            valor: 0,
            valorPromo: 0,
            descricao: 'Produto não encontrado.'
        };
        this.caracteristicas = [];
        this.cd.markForCheck();
    }

    possuiPromocao(): boolean {

        return this.detalhesProdutos.possuiPromocao(
            this.produto
        );

    }

    calcularDesconto(): number {

        return this.detalhesProdutos.calcularDesconto(
            this.produto
        );

    }

    adicionarAoCarrinho(): void {

        if (
            this.produto &&
            this.produto.nome !== 'Produto não encontrado'
        ) {

            this.cart.adicionar(this.produto);

        }

    }

    voltar(): void {

        this.location.back();

    }

}
