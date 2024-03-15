import { UserInterface } from "src/services/interfaces/user";
import { StorageManagger } from "./storage";

export class SessionManagger {

    public getUserSesionData(): UserInterface {

        const userData = (new StorageManagger).getItem('user', true);

        if (userData) {
            return userData as UserInterface;            
        } else {
            return null;
        }
        
    }
}