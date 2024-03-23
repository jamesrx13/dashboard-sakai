import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SesionManagerComponent } from './sesionManager.component'; 

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SesionManagerComponent }
    ])],
    exports: [RouterModule]
})
export class SesionManagerRoutingModule { }
