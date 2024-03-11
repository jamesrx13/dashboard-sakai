import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-access',
    templateUrl: './access.component.html',
})
export class AccessComponent { 

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
