import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { appConfigurations } from 'src/environments/environment';
import { AuthServices } from 'src/services/auth.service';
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

    valCheck: string[] = ['remember'];

    password!: string;

    services: AuthServices = new AuthServices();

    constructor(
        public layoutService: LayoutService,
        private form: FormBuilder
    ) {
        this.setUserPreferences();
        this.loginForm = this.form.group({
            email: ['', [Validators.required, Validators.email]],
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

    // loginSubmit(event: Event) {
    //     event.preventDefault();
    //     const formData = new FormData(event.target as HTMLFormElement);

    //     this.services.logIn(formData);
    // }

    loginSubmit() {
        console.log(this.loginForm.value);
        console.log(this.loginForm);

        if (this.loginForm.valid) {
            this.services.logIn(this.loginForm.value);
        }
    }

    hasError(controlName: string, errorName: string) {
        return (
            this.loginForm.controls[controlName]?.hasError(errorName) &&
            this.loginForm.controls[controlName]?.touched
        );
    }
}
