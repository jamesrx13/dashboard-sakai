import { Component } from '@angular/core';
import { SessionManagger } from 'src/utilities/session';

@Component({
    selector: 'app-usersidebarcontent',
    templateUrl: './sideBar.component.html',
    styleUrl: './sideBar.component.scss',
})

export class UserSideBarComponent {

    userName: string = (new SessionManagger).getUserSesionData()?.user_name;


}
