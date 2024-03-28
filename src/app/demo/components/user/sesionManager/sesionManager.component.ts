import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { appConfigurations } from 'src/environments/environment';
import { MessageToastService } from 'src/services/toast.service';
import { WithAuthRequest } from 'src/utilities/request';
import { StorageManagger } from 'src/utilities/storage';

interface TokenInterface {
    id: string;
    token: string;
    description: string;
    status: number;
    created_at: string;
    user_id: string;
}

interface TokenInformation {
    msg: string;
    type: number;
}

@Component({
    selector: 'app-sesionManager',
    templateUrl: './sesionManager.component.html',
    providers: [ConfirmationService, StorageManagger],
})

export class SesionManagerComponent{

    // Listado y páginación
    countData: number = 1;
    page: number = 1;
    totalPages: number = 0;
    loading: boolean = true;

    // Requeridos en esta vista
    countTokents: number = 0;
    allTokens: TokenInterface[] = [];
    tokenViewAll: string = '';
    formPasswordController: FormGroup;
    formTokenController: FormGroup;
    addTokenOverlay: boolean = false;  
    dropdownItems: Array<TokenInformation> = []; 

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private toasServices: MessageToastService,
        private from: FormBuilder, 
        private confirmationService: ConfirmationService,
        private messageService: MessageToastService,
    ) {
        this.formPasswordController = this.from.group({
            password: ['', [Validators.required]],
        })

        this.formTokenController = this.from.group({
            tokenType: ['', [Validators.required]],
            description: ['', [Validators.required]],
        })
    }

    ngOnInit(): void {
        this.loadMyTokens();
    }

    loadMyTokens() {

        this.loading = true;
        appConfigurations.listMyCustomsTokens.searchParams.delete('search');
        appConfigurations.listMyCustomsTokens.searchParams.delete('countData');
        appConfigurations.listMyCustomsTokens.searchParams.delete('page');

        if(this.filter){
            appConfigurations.listMyCustomsTokens.searchParams.append('search', this.filter.nativeElement.value);
        }
        appConfigurations.listMyCustomsTokens.searchParams.append('countData', this.countData.toString());
        appConfigurations.listMyCustomsTokens.searchParams.append('page', this.page.toString());

        WithAuthRequest(appConfigurations.listMyCustomsTokens, {
            method: 'GET',
        }).then((response: any) => {
            
            if( response.status ){

                this.allTokens = response.data
                this.totalPages = response.totalPages;
                this.countTokents = response.totalRecords;

            } else {
                this.toasServices.showErrorViaToast('Error', response.msg)
            }

        }).catch((error) => {
            console.error(error);
            this.toasServices.showErrorViaToast('Error', error)
        }).finally(() => {
            this.loading = false;
        })
    }

    handlePagination(event: any) {
        this.page = event.page + 1;
        this.loadMyTokens()
    }

    onGlobalFilter() {
        this.loadMyTokens()
    }

    clear() {
        this.page = 1;
        this.loading = true;
        this.filter.nativeElement.value = '';
        this.loadMyTokens();
    }

    getCurrentStatus(status: number) {
        return status == 1 ? true : false;
    }

    changeStatus(token: TokenInterface) {

        const formData = new FormData();

        formData.append('tokenId', token.id);

        WithAuthRequest(appConfigurations.changeTokenStatus, {
            method: 'POST',
        }, formData).then((response: any) => {

            if( response.status ){
                this.toasServices.showSuccessViaToast('Success', 'Token status changed')
                this.loadMyTokens()
            } else {
                this.toasServices.showErrorViaToast('Error', response.msg)
            }
        }).catch((error) => {
            console.error(error);
            this.toasServices.showErrorViaToast('Error', error)
        })
    }

    viewTokenInfo(token: TokenInterface) {
        this.tokenViewAll = token.token
        this.confirmationService.confirm({
            header: token.description,
            acceptIcon:"none",
            rejectVisible: false,
            rejectButtonStyleClass:"p-button-text",
            key: 'tokenInfo',
        });
    }

    copyToClipboard(token: string) {
        navigator.clipboard.writeText(token).then(() => {
            this.toasServices.showSuccessViaToast('Success', 'Token copied')
        }).catch((error) => {
            this.toasServices.showErrorViaToast('Error', error)
        })
    }

    deleteToken(token: TokenInterface) {
        this.confirmationService.confirm({
            header: 'Are you sure you want to delete this token?',
            acceptIcon:"none",
            rejectIcon:"none",
            rejectButtonStyleClass:"p-button-text",
            key: 'deleteToken',
            accept: () => {
                
                if(this.formPasswordController.valid){
                    
                    const formData = new FormData();

                    formData.append('tokenId', token.id);
                    formData.append('password', this.formPasswordController.get('password').value);

                    WithAuthRequest(appConfigurations.deleteCustomToken, {
                        method: 'POST',
                    }, formData).then((response: any) => {

                        if( response.status ){
                            this.toasServices.showSuccessViaToast('Success', 'Token deleted')
                            this.loadMyTokens()
                        } else {
                            this.toasServices.showErrorViaToast('Error', response.msg)
                        }

                    }).catch((error) => {
                        console.error(error);
                        this.toasServices.showErrorViaToast('Error', error)
                    });

                    
                } else {
                    this.messageService.showErrorViaToast('Error', 'Form is not valid');
                }

            }
        });
    }

    addToken(){
        this.addTokenOverlay = true
        this.loadTokensTypes()
    }

    loadTokensTypes(){
        WithAuthRequest(appConfigurations.listInformationToken, {
            method: 'GET',
        }).then((response: any) => {
            if( response.status ){
                this.dropdownItems = response.data                                
            } else {
                this.toasServices.showErrorViaToast('Error', response.msg)
            }

        }).catch((error) => {
            console.error(error);
            this.toasServices.showErrorViaToast('Error', error)
        })
    }

    createToken(){
        if(this.formTokenController.valid){

            const formData = new FormData();    

            formData.append('description', this.formTokenController.get('description').value);
            formData.append('tokenType', this.formTokenController.get('tokenType')?.value?.type);

            WithAuthRequest(appConfigurations.createCustomToken, {
                method: 'POST',
            }, formData).then((response: any) => {

                if( response.status ){
                    this.toasServices.showSuccessViaToast('Success', 'Token created')
                    this.addTokenOverlay = false

                    this.loadMyTokens()

                    this.formTokenController.get('description').setValue('')
                    this.formTokenController.get('tokenType').setValue(null)
                    
                } else {
                    this.toasServices.showErrorViaToast('Error', response.msg)
                }

            }).catch((error) => {
                console.error(error);
                this.toasServices.showErrorViaToast('Error', error)
            });

        } else {
            this.messageService.showWarnViaToast('Error', 'Form is not valid');
        }
    }
}
