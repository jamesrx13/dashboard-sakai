import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { 
            path: '', 
            loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) 
        },
        { 
            path: 'sesion-manager', 
            loadChildren: () => import('./sesionManager/sesionManager.module').then(m => m.SesionManagerModule) 
        },
        { 
            path: 'users-manager', 
            loadChildren: () => import('./usersManager/usersManager.module').then(m => m.UsersManagerModule) 
        },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UserRoutingModule { }
