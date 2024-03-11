import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { appConfigurations } from 'src/environments/environment';
import { StorageManagger } from 'src/utilities/storage';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(public layoutService: LayoutService) {
        this.setUserPreferences()
    }

    setUserPreferences() {
        const userPreferences = (new StorageManagger).getItem(appConfigurations.userPreferences, true);

        if( userPreferences ) {
            this.layoutService.config.update(() => userPreferences);
        }
    }
}
