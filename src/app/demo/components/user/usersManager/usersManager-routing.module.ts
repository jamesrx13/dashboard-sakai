import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersManagerComponent } from './usersManager.component'; 

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: UsersManagerComponent }
    ])],
    exports: [RouterModule]
})
export class UsersManagerRoutingModule { }
