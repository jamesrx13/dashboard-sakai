import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { appConfigurations } from 'src/environments/environment';
import { UserInterface } from 'src/services/interfaces/user';
import { MessageToastService } from 'src/services/toast.service';
import { WithAuthRequest } from 'src/utilities/request';
import { SessionManagger } from 'src/utilities/session';
import { StorageManagger } from 'src/utilities/storage';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    providers: [ConfirmationService, StorageManagger],
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
        private storage: StorageManagger,
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
            this.showComfirmation();
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

                    const formData = new FormData();

                    formData.set('user_name', this.formController.get('user_name')?.value);
                    formData.set('email', this.formController.get('email')?.value);
                    formData.set('name', this.formController.get('name')?.value);
                    formData.set('last_name', this.formController.get('last_name')?.value);
                    formData.set('password', this.formController.get('password')?.value);

                    WithAuthRequest(appConfigurations.userEdit, {
                        method: 'POST',
                    }, formData).then((response: any) => {

                        if(response.status){
                            this.messageService.showSuccessViaToast('Success', response.msg);
                            this.storage.setItem(appConfigurations.user, JSON.stringify(response.data));    
                            location.reload();                        
                        } else {
                            this.messageService.showErrorViaToast('Error', response.msg);
                        }

                    }).catch((error) => {
                        this.messageService.showErrorViaToast('Error', error);
                        console.log(error);
                    });

                } else {
                    this.messageService.showErrorViaToast('Error', 'Form is not valid');
                }
            },
            reject: () => {
            }
        });
    }


}
