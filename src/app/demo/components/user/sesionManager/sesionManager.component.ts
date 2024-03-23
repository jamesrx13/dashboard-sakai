import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { StorageManagger } from 'src/utilities/storage';

@Component({
    selector: 'app-sesionManager',
    templateUrl: './sesionManager.component.html',
    providers: [ConfirmationService, StorageManagger],
})

export class SesionManagerComponent{}
