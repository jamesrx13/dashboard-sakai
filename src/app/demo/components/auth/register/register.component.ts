import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class RegisterComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(public layoutService: LayoutService) {
        this.setUserPreferences()
    }
    
    setUserPreferences() {
        const userPreferences = JSON.parse(localStorage.getItem('userPreferences'));

        if( userPreferences ) {
            this.layoutService.config.update(() => userPreferences);
        }
    }
}
