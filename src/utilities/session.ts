import { UserInterface } from "src/services/interfaces/user";
import { StorageManagger } from "./storage";
import { appConfigurations } from "src/environments/environment";
import { WithAuthRequest } from "./request";
import { Router } from "@angular/router";
import { MessageToastService } from "src/services/toast.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SessionManagger {

    storage: StorageManagger = new StorageManagger();

    constructor(private router: Router, private toast: MessageToastService) {}

    public getUserSesionData(): UserInterface {

        const userData = (new StorageManagger).getItem(appConfigurations.user, true);

        if (userData) {
            return userData as UserInterface;            
        } else {
            return null;
        }
        
    }

    public logout() {        
        WithAuthRequest(appConfigurations.userLogout, {
            method: 'POST'
        }).then((response: any) => {            
            if(response.status){
                this.storage.removeItem(appConfigurations.user);   
                this.storage.removeItem(appConfigurations.jwtAuth);   
                this.router.navigate(['/auth']);
            } else {
                this.toast.showErrorViaToast('Error', 'Error al cerrar la sesion');
            }
        })
    }

    public InitSesion(token: string, userData: UserInterface) {
        this.storage.setItem(appConfigurations.jwtAuth, token);
        this.storage.setItem(appConfigurations.user, JSON.stringify(userData));
        this.router.navigate(['/dashboard']);
    }
}