import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'step-1',
        loadComponent: () => import('./pages/step-1/step-1.component') 
    },
    {
        path: 'step-2',
        loadComponent: () => import('./pages/step-2/step-2.component') 
    },
    {
        path: 'step-3',
        loadComponent: () => import('./pages/step-3/step-3.component') 
    }
];
