import { WithOutAuthRequest } from "src/utilities/request";
import { LoginInterface, VerifyLoginInterface } from "./interfaces/auth";
import { ErrorInterface } from "./interfaces/error";
import { appConfigurations } from "src/environments/environment";
import { StorageManagger } from "src/utilities/storage";

export class AuthServices {

    public logIn(formData: FormData): ErrorInterface|LoginInterface {

        WithOutAuthRequest(appConfigurations.authUrl, {
            method: 'POST'
        }, formData).then((resp: ErrorInterface|LoginInterface) => {

            if(resp.status){
                resp = resp as LoginInterface
                
                const storageMager = new StorageManagger();

                storageMager.setItem(appConfigurations.userAuthToken, resp.AuthToken);
                storageMager.setItem(appConfigurations.user, JSON.stringify(resp.data));

                //this.isAuthenticated()

            } else {
                //TODO: Show toast
                resp = resp as ErrorInterface
                alert(resp.msg);
            }

            return resp;

        }).catch(error => {
            //TODO: Show toast
            console.error(error);
        })
        
        return null
    }

    public isAuthenticated(): boolean {
        
        let isValid: boolean = false

        WithOutAuthRequest(appConfigurations.sesionVerify, {
            method: 'POST'
        }).then((resp: ErrorInterface|VerifyLoginInterface) => {
            
            if(resp.status){
                resp = resp as VerifyLoginInterface

                const storageMager = new StorageManagger();

                if(storageMager.getItem(appConfigurations.userAuthToken) &&  storageMager.getItem(appConfigurations.user)){
                    storageMager.setItem(appConfigurations.user, JSON.stringify(resp.data));
                    isValid = true
                }

            } else {
                //TODO: Show toast
                resp = resp as ErrorInterface
                alert(resp.msg);
            }         

        }).catch(error => {
            //TODO: Show toast
            console.error(error);
        })

        return isValid

    }

}