import { MessageService } from "primeng/api";

export class ToastManagger {

    constructor(private service: MessageService){}

    showInfoViaToast(title: string, message: string) {
        this.service.add({ key: 'tst', severity: 'info', summary: title, detail: message });
    }

    showWarnViaToast(title: string, message: string) {
        this.service.add({ key: 'tst', severity: 'warn', summary: title, detail: message });
    }

    showErrorViaToast(title: string, message: string) {
        this.service.add({ key: 'tst', severity: 'error', summary: title, detail: message });;
    }

    showSuccessViaToast(title: string, message: string) {
        this.service.add({ key: 'tst', severity: 'success', summary: title, detail: message });
    }
}