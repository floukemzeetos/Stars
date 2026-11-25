import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClienteApi } from '../../service/cliente-api';
import { PedidoApi } from '../../service/pedido-api';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css'
})
export class MeusPedidos implements OnInit {
  private clienteApi = inject(ClienteApi);
  private pedidoApi = inject(PedidoApi);
  private cd = inject(ChangeDetectorRef);

  pedidos: any[] = [];
  carregando = true;
  erro = '';

  get totalGasto(): number {
    return this.pedidos.reduce((acc, p) => acc + (p.valorTotal || 0), 0);
  }

  ngOnInit(): void {
    const cliente = this.clienteApi.clienteLogado();
    if (!cliente) {
      this.carregando = false;
      return;
    }
    this.pedidoApi.listarDoCliente(cliente.codigo).subscribe({
      next: lista => {
        this.pedidos = lista;
        this.carregando = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.erro = 'Não foi possível carregar seus pedidos. Tente novamente.';
        this.carregando = false;
        this.cd.detectChanges();
      }
    });
  }

  subtotal(item: any): number {
    return item.valorUnitario * item.quantidade;
  }
}
