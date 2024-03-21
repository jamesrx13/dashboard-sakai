import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { UserInterface } from 'src/services/interfaces/user';
import { SessionManagger } from 'src/utilities/session';

@Component({
    selector: 'app-usersidebarcontent',
    templateUrl: './sideBar.component.html',
    styleUrl: './sideBar.component.scss',
    providers: [ConfirmationService],  
})

export class UserSideBarComponent {
    
    userData: UserInterface;

    @Output() needClose = new EventEmitter();

    constructor(private confirmationService: ConfirmationService, private router: Router, private sessionManager: SessionManagger){
        this.userData = this.sessionManager.getUserSesionData();
    }

    logout() {
        this.confirmationService.confirm({
            message: 'Are you sure to close your current session?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon:"none",
            rejectIcon:"none",
            rejectButtonStyleClass:"p-button-text",
            accept: () => this.sessionManager.logout(),
            reject: () => {
            }
        });
    }

    closeSideBar(){
        this.needClose.emit();
    }

}
