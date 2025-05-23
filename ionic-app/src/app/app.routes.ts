import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'update/:name',
    loadComponent: () => import('./update/update.page').then((m) => m.UpdatePage),
  },
];