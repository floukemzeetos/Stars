import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ClienteApi } from './cliente-api';

// Protege páginas que exigem cliente logado (perfil, pedidos).
export const exigeLogin: CanActivateFn = () => {
  const logado = inject(ClienteApi).clienteLogado();
  return logado ? true : inject(Router).createUrlTree(['/login']);
};
