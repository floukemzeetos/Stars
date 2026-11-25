import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../service/cart';
import { Router } from '@angular/router';
import { ClienteApi } from '../service/cliente-api';
import { PedidoApi } from '../service/pedido-api';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrinho.html',
  styleUrls: ['./carrinho.css']
})
export class Carrinho {
  mensagem = '';
  enviando = false;
  pedidoRealizado = false;

  constructor(
    public cart: CartService,
    private router: Router,
    private clienteApi: ClienteApi,
    private pedidoApi: PedidoApi
  ) {}

  finalizar() {
    const cliente = this.clienteApi.clienteLogado();
    if (!cliente) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.enviando = true;
    this.mensagem = '';
    this.pedidoRealizado = false;

    const pedido = {
      codigoCliente: cliente.codigo,
      entrega: 'Retirar na loja',
      obs: '',
      itens: this.cart.items().map(item => ({
        codigoProduto: item.codigo,
        quantidade: item.quantidadeSelecionada || 1
      }))
    };

    this.pedidoApi.criar(pedido).subscribe({
      next: res => {
        this.cart.esvaziar();
        this.enviando = false;
        this.mensagem = `Pedido nº ${res.codigoPedido} realizado com sucesso!`;
        this.pedidoRealizado = true;
      },
      error: err => {
        this.enviando = false;
        this.mensagem = err?.error?.mensagem ?? 'Não foi possível concluir o pedido. Tente novamente.';
      }
    });
  }

  aumentar(item: any) {
    this.cart.aumentar(item);
  }

  diminuir(item: any) {
    this.cart.diminuir(item);
  }
}