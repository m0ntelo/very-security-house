import { Routes } from '@angular/router';
import { DoorGuard } from '@core/guard/door.guard';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '1', 
        pathMatch: 'full' 
    },
    {
        path: '1',
        loadComponent: () => import('@pages/step-1/step-1.component'),
        canActivate: [DoorGuard]
    },
    {
        path: '2',
        loadComponent: () => import('@pages/step-2/step-2.component') 
    },
    {
        path: '3',
        loadComponent: () => import('@pages/step-3/step-3.component') 
    },
    { 
        path: '**', 
        redirectTo: '/1', 
        pathMatch: 'full' 
    }
];
