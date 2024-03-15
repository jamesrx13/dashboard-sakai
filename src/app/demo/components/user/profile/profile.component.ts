import { Component } from '@angular/core';
import { UserInterface } from 'src/services/interfaces/user';
import { SessionManagger } from 'src/utilities/session';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent {

    userData: UserInterface = (new SessionManagger).getUserSesionData()


}
