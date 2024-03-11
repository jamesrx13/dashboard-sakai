import { UserInterface } from "./user";

export interface LoginInterface {
    status:    boolean;
    AuthToken: string;
    data:      UserInterface;
}
