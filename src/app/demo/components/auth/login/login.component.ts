import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { appConfigurations } from 'src/environments/environment';
import { AuthServices } from 'src/services/auth.service';
import { StorageManagger } from 'src/utilities/storage';
import { ToastManagger } from 'src/utilities/toast';

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

    valCheck: string[] = ['remember'];

    password!: string;

    services: AuthServices = new AuthServices();

    constructor(
        public layoutService: LayoutService,
        private form: FormBuilder,
    ) {
        this.setUserPreferences();
        this.loginForm = this.form.group({
            user_name: ['', [Validators.required]],
            password: ['', [Validators.required]],
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

            const formData = new FormData();

            formData.set('user_name', this.loginForm.get('user_name')?.value);
            formData.set('password', this.loginForm.get('password')?.value);

            this.services.logIn(formData);
            
        } else {
            //TODO: Show toast
            alert('Form is not valid');
        }
    }

    hasError(controlName: string, errorName: string) {
        return (
            this.loginForm.controls[controlName]?.hasError(errorName) &&
            this.loginForm.controls[controlName]?.touched
        );
    }
}
