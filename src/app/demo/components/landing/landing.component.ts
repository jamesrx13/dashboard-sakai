import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { appConfigurations } from 'src/environments/environment';
import { StorageManagger } from 'src/utilities/storage';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html'
})
export class LandingComponent {

    constructor(public layoutService: LayoutService, public router: Router) {
        this.setUserPreferences()
    }


    setUserPreferences() {
        const userPreferences = (new StorageManagger).getItem(appConfigurations.userPreferences, true);

        if( userPreferences ) {
            this.layoutService.config.update(() => userPreferences);
        }
    }
    
}
