import { WithOutAuthRequest } from "src/utilities/request";
import { LoginInterface, VerifyLoginInterface } from "./interfaces/auth";
import { ErrorInterface } from "./interfaces/error";
import { appConfigurations } from "src/environments/environment";
import { StorageManagger } from "src/utilities/storage";
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export class AuthServices {

    router: Router = inject(Router);    

    public logIn(formData: FormData, finalCallable: Function = () => {}): ErrorInterface|LoginInterface {

        WithOutAuthRequest(appConfigurations.authUrl, {
            method: 'POST'
        }, formData).then((resp: ErrorInterface|LoginInterface) => {

            if(resp.status){
                resp = resp as LoginInterface
                
                const storageMager = new StorageManagger();

                storageMager.setItem(appConfigurations.jwtAuth, resp.AuthToken);
                storageMager.setItem(appConfigurations.user, JSON.stringify(resp.data));

                this.router.navigate(['/dashboard']);

            } else {
                //TODO: Show toast
                resp = resp as ErrorInterface
                alert(resp.msg);
            }

            finalCallable();

            return resp;

        }).catch(error => {
            //TODO: Show toast
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

}