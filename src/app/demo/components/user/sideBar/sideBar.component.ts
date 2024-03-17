import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { SessionManagger } from 'src/utilities/session';

@Component({
    selector: 'app-usersidebarcontent',
    templateUrl: './sideBar.component.html',
    styleUrl: './sideBar.component.scss',
    providers: [ConfirmationService],  
})

export class UserSideBarComponent {

    userName: string = (new SessionManagger).getUserSesionData()?.user_name;

    constructor(private confirmationService: ConfirmationService, private router: Router){}

    logout() {
        this.confirmationService.confirm({
            message: 'Are you sure to close your current session?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon:"none",
            rejectIcon:"none",
            rejectButtonStyleClass:"p-button-text",
            accept: () => {
                (new SessionManagger).logout();
                this.router.navigate(['/auth']);
            },
            reject: () => {
            }
        });
    }

}
