import { WithAuthRequest, WithOutAuthRequest } from "src/utilities/request";
import { LoginInterface, VerifyLoginInterface } from "./interfaces/auth";
import { ErrorInterface } from "./interfaces/error";
import { appConfigurations } from "src/environments/environment";
import { StorageManagger } from "src/utilities/storage";
import { inject } from "@angular/core";
import { MessageToastService } from "./toast.service";
import { SessionManagger } from "src/utilities/session";

export class AuthServices {

    toast: MessageToastService = inject(MessageToastService);
    sessionManager: SessionManagger = inject(SessionManagger);

    public logIn(formData: FormData, finalCallable: Function = () => {}): ErrorInterface|LoginInterface {

        WithOutAuthRequest(appConfigurations.authUrl, {
            method: 'POST'
        }, formData).then((resp: ErrorInterface|LoginInterface) => {

            if(resp.status){
                resp = resp as LoginInterface
                
                this.sessionManager.InitSesion(resp.AuthToken, resp.data);

                this.toast.showSuccessViaToast('Welcome to', appConfigurations.applicationName);

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