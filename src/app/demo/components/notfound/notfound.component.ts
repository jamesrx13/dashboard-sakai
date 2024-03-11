import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { appConfigurations } from 'src/environments/environment';
import { StorageManagger } from 'src/utilities/storage';

@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
})
export class NotfoundComponent {
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