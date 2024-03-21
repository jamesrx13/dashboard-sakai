import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { UserInterface } from 'src/services/interfaces/user';
import { MessageToastService } from 'src/services/toast.service';
import { SessionManagger } from 'src/utilities/session';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    providers: [ConfirmationService],
})

export class ProfileComponent implements OnInit {

    formController: FormGroup;
    userData: UserInterface;

    isEnterPassword: boolean = false;

    constructor(
        private sesionManager: SessionManagger, 
        private confirmationService: ConfirmationService, 
        private from: FormBuilder,
        private messageService: MessageToastService,
    ){
        this.userData= this.sesionManager.getUserSesionData()

        this.formController = this.from.group({
            user_name: [this.userData.user_name, [Validators.required]],
            email: [this.userData.email, [Validators.required]],
            name: [this.userData.name, [Validators.required]],
            last_name: [this.userData.last_name, [Validators.required]],
            password: ['',  [Validators.required]],
        })
    }

    ngOnInit(): void {
        this.formController.get('password').valueChanges.subscribe((value) => {
            if (value.length > 2) {
                this.isEnterPassword = true;
            } else {
                this.isEnterPassword = false;
            }  
        })
    }

    showComfirmation() {
        this.confirmationService.confirm({
            header: 'Please enter your password to complete this action',
            acceptIcon:"none",
            rejectIcon:"none",
            rejectButtonStyleClass:"p-button-text",
            acceptVisible: this.isEnterPassword,
            accept: () => {
                if (this.formController.valid) {

                } else {
                    this.messageService.showErrorViaToast('Error', 'Form is not valid');
                }
            },
            reject: () => {
            }
        });
    }


}
