import { WithOutAuthRequest } from "src/utilities/request";
import { LoginInterface } from "./interfaces/auth";
import { ErrorInterface } from "./interfaces/error";
import { appConfigurations } from "src/environments/environment";

export class AuthServices {

    public logIn(formData: FormData): ErrorInterface|LoginInterface {

        WithOutAuthRequest(appConfigurations.authUrl, {
            method: 'POST'
        }, formData).then((resp: ErrorInterface|LoginInterface) => {
            if(resp.status){
                
            } else {

            }

            return resp;

        }).catch(error => {
            //TOAS
            console.error(error);
        })
        
        return null
    }

    public isAuthenticated(): boolean {
        return true;
    }

}