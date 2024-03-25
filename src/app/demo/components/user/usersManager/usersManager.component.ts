import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { appConfigurations } from 'src/environments/environment';
import { UserInterface } from 'src/services/interfaces/user';
import { MessageToastService } from 'src/services/toast.service';
import { WithAuthRequest } from 'src/utilities/request';
import { StorageManagger } from 'src/utilities/storage';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'app-usersManager',
    templateUrl: './usersManager.component.html',
    providers: [ConfirmationService, StorageManagger],
})

export class UsersManagerComponent {

    allUsers: UserInterface[] = [];

    countData: number = 10;
    page: number = 1;
    totalPages: number = 0;

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private toasServices: MessageToastService) {}
    
    ngOnInit() {
        this.loadTable();
    }

    onGlobalFilter() {
        this.loadTable();
    }

    clear() {
        this.page = 1;
        this.loading = true;
        this.filter.nativeElement.value = '';
        this.loadTable();
    }

    loadTable(){

        if(this.filter){
            appConfigurations.userList.searchParams.append('search', this.filter.nativeElement.value);
        }
        appConfigurations.userList.searchParams.append('countData', this.countData.toString());
        appConfigurations.userList.searchParams.append('page', this.page.toString());

        WithAuthRequest(appConfigurations.userList, {
            method: 'GET',
        }).then((response: any) => {
            if(response.status){                
                this.allUsers = response.data;
                this.totalPages = response.totalPages;
                this.loading = false;           
            } else {
                this.toasServices.showErrorViaToast('Error', response.msg);  
                this.loading = false;           
            }
        }).catch((error) => {
            console.error(error);
            this.loading = false;           
            this.toasServices.showErrorViaToast('Error', error);
        });
    }

    handlePagination(event: any) {
        this.page = event.page + 1;
        this.loadTable();
    }

}