import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class MessageToastService {

    constructor(private messageService: MessageService) { }

    showInfoViaToast(title: string, message: string) {
        this.messageService.add({ severity: 'info', summary: title, detail: message });
    }

    showWarnViaToast(title: string, message: string) {
        this.messageService.add({ severity: 'warn', summary: title, detail: message });
    }

    showErrorViaToast(title: string, message: string) {
        this.messageService.add({ severity: 'error', summary: title, detail: message });
    }

    showSuccessViaToast(title: string, message: string) {
        this.messageService.add({ severity: 'success', summary: title, detail: message });
    }

}