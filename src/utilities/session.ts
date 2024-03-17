import { UserInterface } from "src/services/interfaces/user";
import { StorageManagger } from "./storage";
import { appConfigurations } from "src/environments/environment";

export class SessionManagger {

    public getUserSesionData(): UserInterface {

        const userData = (new StorageManagger).getItem('user', true);

        if (userData) {
            return userData as UserInterface;            
        } else {
            return null;
        }
        
    }

    public logout() {
        (new StorageManagger).removeItem(appConfigurations.user);   
        (new StorageManagger).removeItem(appConfigurations.jwtAuth);   
    }
}