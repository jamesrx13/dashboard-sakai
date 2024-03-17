import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { appConfigurations } from 'src/environments/environment';
import { AuthServices } from 'src/services/auth.service';
import { MessageToastService } from 'src/services/toast.service';
import { StorageManagger } from 'src/utilities/storage';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    loginForm: FormGroup;

    loading = false;

    password!: string;

    services: AuthServices = new AuthServices();

    storage: StorageManagger = new StorageManagger();

    constructor(
        public layoutService: LayoutService,
        private form: FormBuilder,
        private messageService: MessageToastService
    ) {
        this.setUserPreferences();
        this.loginForm = this.form.group({
            user_name: [this.storage.getItem(appConfigurations.userName), [Validators.required]],
            password: ['', [Validators.required]],
            remember: ['', []],
        });
    }

    setUserPreferences() {
        const userPreferences = new StorageManagger().getItem(
            appConfigurations.userPreferences,
            true
        );

        if (userPreferences) {
            this.layoutService.config.update(() => userPreferences);
        }
    }

    loginSubmit() {
        if (this.loginForm.valid) {
            
            this.loading = true

            const userName = this.loginForm.get('user_name')?.value

            if(this.loginForm.get('remember')?.value){
                this.storage.setItem(appConfigurations.userName, userName)
            }            

            const formData = new FormData();

            formData.set('user_name', userName);
            formData.set('password', this.loginForm.get('password')?.value);

            this.services.logIn(formData, () => {
                this.loading = false
            });
            
        } else {
            this.messageService.showErrorViaToast('Error', 'Form is not valid');
        }
    }

    hasError(controlName: string, errorName: string) {
        return (
            this.loginForm.controls[controlName]?.hasError(errorName) &&
            this.loginForm.controls[controlName]?.touched
        );
    }
}
