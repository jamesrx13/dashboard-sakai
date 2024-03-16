import { WithAuthRequest, WithOutAuthRequest } from "src/utilities/request";
import { LoginInterface, VerifyLoginInterface } from "./interfaces/auth";
import { ErrorInterface } from "./interfaces/error";
import { appConfigurations } from "src/environments/environment";
import { StorageManagger } from "src/utilities/storage";
import { Router } from "@angular/router";
import { inject } from "@angular/core";
import { MessageToastService } from "./toast.service";

export class AuthServices {

    router: Router = inject(Router);    
    toast: MessageToastService = inject(MessageToastService);

    public logIn(formData: FormData, finalCallable: Function = () => {}): ErrorInterface|LoginInterface {

        WithOutAuthRequest(appConfigurations.authUrl, {
            method: 'POST'
        }, formData).then((resp: ErrorInterface|LoginInterface) => {

            if(resp.status){
                resp = resp as LoginInterface
                
                const storageMager = new StorageManagger();

                this.toast.showSuccessViaToast('Welcome to', appConfigurations.applicationName);

                storageMager.setItem(appConfigurations.jwtAuth, resp.AuthToken);
                storageMager.setItem(appConfigurations.user, JSON.stringify(resp.data));

                this.router.navigate(['/dashboard']);

            } else {
                resp = resp as ErrorInterface
                this.toast.showErrorViaToast('Error', resp.msg);
            }

            finalCallable();

            return resp;

        }).catch(error => {
            this.toast.showErrorViaToast('Error', error);
            console.error(error);
        })
        
        return null
    }

    public isAuthenticated(): boolean { 

        let isAuth = false

        const storageMager = new StorageManagger();

        if(storageMager.getItem(appConfigurations.jwtAuth) && storageMager.getItem(appConfigurations.user)){
            isAuth = true
        }          

        return isAuth

    }

    public validateSesion(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            
            WithAuthRequest(appConfigurations.sesionVerify, {
                method: 'POST'
            }).then((resp: VerifyLoginInterface) => {
                resolve(resp.status)
            }).catch(error => {
                resolve(false)
            })

        })
    }

}