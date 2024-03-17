import { Component, ElementRef, EventEmitter, Output, ViewChild, ViewChildren } from '@angular/core';
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
    
    userName: string;

    @Output() needClose = new EventEmitter();

    @ViewChildren('li') li!: ElementRef[]

    constructor(private confirmationService: ConfirmationService, private router: Router, private sessionManager: SessionManagger){
        this.userName = this.sessionManager.getUserSesionData().user_name;
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
