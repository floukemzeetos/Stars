import { Routes } from '@angular/router';

import { Vitrine } from './vitrine/vitrine';
import { AtacadistaComponent } from './atacadista/atacadista';
import { CasaMesaBanho } from './casa-mesa-banho/casa-mesa-banho';
import { DiscosComponent } from './discos/discos';
import { EletroComponent } from './eletro/eletro';
import { FilmesAntigos } from './filmes-antigos/filmes-antigos';
import { Gamer } from './gamer/gamer';
import { Livraria } from './livraria/livraria';
import { Pharma } from './pharma/pharma';
import { ProdutosPremium } from './produtos-premium/produtos-premium';
import { Retro } from './retro/retro';
import { RetroComum } from './retro-comum/retro-comum';
import { RetroGame } from './retro-game/retro-game';
import { Login } from './paginas/login/login';
import { Cadastro } from './paginas/cadastro/cadastro';
import { RecuperarSenha } from './paginas/recuperar-senha/recuperar-senha';
import { RedefinirSenha } from './paginas/redefinir-senha/redefinir-senha';
import { Carrinho } from './carrinho/carrinho';
import { Busca } from './paginas/busca/busca';
import { Detalhe } from './detalhe/detalhe';
import { EmManutencao } from './paginas/em-manutencao/em-manutencao';
import { EmConstrucao } from './paginas/em-construcao/em-construcao';
import { Perfil } from './paginas/perfil/perfil';
import { MeusPedidos } from './paginas/meus-pedidos/meus-pedidos';
import { exigeLogin } from './service/auth.guard';

export const routes: Routes = [

    {
        path: '',
        children: [
            { path: '', component: Vitrine },
            { path: 'atacadista', component: AtacadistaComponent },
            { path: 'casa-mesa-banho', component: CasaMesaBanho },
            { path: 'discos', component: DiscosComponent },
            { path: 'eletro', component: EletroComponent },
            { path: 'filmes-antigos', component: FilmesAntigos },
            { path: 'gamer', component: Gamer },
            { path: 'livraria', component: Livraria },
            { path: 'pharma', component: Pharma },
            { path: 'produtos-premium', component: ProdutosPremium },
            { path: 'retro', component: Retro },
            { path: 'retro-comum', component: RetroComum },
            { path: 'retro-game', component: RetroGame },
            { path: 'busca', component: Busca },
            { path: 'carrinho', component: Carrinho },
            { path: 'detalhes/:codigo', component: Detalhe },
            { path: 'perfil', component: Perfil, canActivate: [exigeLogin] },
            { path: 'meus-pedidos', component: MeusPedidos, canActivate: [exigeLogin] }
        ]
    },

    { path: 'login', component: Login },
    { path: 'cadastro', component: Cadastro },
    { path: 'recuperarSenha', component: RecuperarSenha },
    { path: 'redefinir-senha', component: RedefinirSenha },
    { path: 'em-manutencao', component: EmManutencao },
    { path: 'em-construcao', component: EmConstrucao }
];