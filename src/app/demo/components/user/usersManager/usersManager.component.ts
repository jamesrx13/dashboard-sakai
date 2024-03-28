import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { appConfigurations } from 'src/environments/environment';
import { UserInterface } from 'src/services/interfaces/user';
import { MessageToastService } from 'src/services/toast.service';
import { WithAuthRequest } from 'src/utilities/request';
import { StorageManagger } from 'src/utilities/storage';

interface UserRol {
    name: string;
    code: string;
}

@Component({
    selector: 'app-usersManager',
    templateUrl: './usersManager.component.html',
    providers: [ConfirmationService, StorageManagger],
})

export class UsersManagerComponent {
    // Listado y páginación
    allUsers: UserInterface[] = [];
    countData: number = 10;
    page: number = 1;
    totalPages: number = 0;
    loading: boolean = true;

    // Edición de usuarios
    userToeditIsActive: boolean = false;
    userVisibleDialog: boolean = false;
    userToedit: UserInterface = {} as UserInterface;
    formController: FormGroup;
    formPasswordController: FormGroup;
    isEnterPassword: boolean = false;
    imageFileUpload: File;
    
    // Creación de usuarios
    useraddVisibleDialog: boolean = false;
    formCreateUserController: FormGroup;

    dropdownItems: Array<UserRol> = [];

    @ViewChild('filter') filter!: ElementRef;

    constructor(
        private toasServices: MessageToastService,
        private from: FormBuilder, 
        private confirmationService: ConfirmationService,
        private messageService: MessageToastService,
        ) {
        this.formController = this.from.group({
            id : ['', [Validators.required]],
            user_name: ['', [Validators.required]],
            email: ['', [Validators.required]],
            name: ['', [Validators.required]],
            last_name: ['', [Validators.required]],
            validate_password: ['',  [Validators.required]],
        })

        this.formPasswordController = this.from.group({
            id: ['',  [Validators.required]],
            new_password: ['',  [Validators.required]],
            comfirm_password: ['',  [Validators.required]],
            validate_password: ['',  [Validators.required]],
        })

        this.formCreateUserController = this.from.group({
            user_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            name: ['', Validators.required],
            last_name: ['', Validators.required],
            rol: ['', Validators.required],
        });
    }
    
    ngOnInit() {
        this.loadTable();

        this.formController.get('validate_password').valueChanges.subscribe((value) => {
            if (value.length > 2) {
                this.isEnterPassword = true;
            } else {
                this.isEnterPassword = false;
            }  
            this.showComfirmation();
        })

        WithAuthRequest(appConfigurations.userRolesList, {
            method: 'GET',
        }).then((response: any) => {
            if(response.status){

                const data = response.data;
                
                for(let i in data){
                    this.dropdownItems.push({ name: data[i], code: i })
                }
            }
        })
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

    addUser(){
        this.useraddVisibleDialog = true;
    }

    loadTable(){

        this.loading = true;

        appConfigurations.userList.searchParams.delete('search');
        appConfigurations.userList.searchParams.delete('countData');
        appConfigurations.userList.searchParams.delete('page');

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

    showUserOverley(user: UserInterface){
        this.userToedit = user;
        this.userVisibleDialog = true;

        // setar los valores al formulario
        this.formPasswordController.get('id')?.setValue(user.id);

        this.formController.get('id')?.setValue(user.id);
        this.formController.get('user_name')?.setValue(user.user_name);
        this.formController.get('email')?.setValue(user.email);
        this.formController.get('name')?.setValue(user.name);
        this.formController.get('last_name')?.setValue(user.last_name); 

        this.userToeditIsActive = user.status == 1 ? true : false;
    }

    showComfirmation(){
        this.confirmationService.confirm({
            header: 'Please enter your password to complete this action',
            acceptIcon:"none",
            rejectIcon:"none",
            rejectButtonStyleClass:"p-button-text",
            acceptVisible: this.isEnterPassword,
            key: 'confirmPassword',
            accept: () => {
                if (this.formController.valid) {

                    const formData = new FormData();

                    formData.set('id', this.formController.get('id')?.value);
                    formData.set('user_name', this.formController.get('user_name')?.value);
                    formData.set('email', this.formController.get('email')?.value);
                    formData.set('name', this.formController.get('name')?.value);
                    formData.set('last_name', this.formController.get('last_name')?.value);
                    formData.set('validate_password', this.formController.get('validate_password')?.value);

                    if(this.imageFileUpload){
                        formData.append('profilePhoto', this.imageFileUpload);
                    }

                    WithAuthRequest(appConfigurations.updateUser, {
                        method: 'POST',
                    }, formData).then((response: any) => {

                        if(response.status){
                            this.messageService.showSuccessViaToast('Success', 'User updated');
                            this.formController.get('validate_password').setValue('')
                            this.userVisibleDialog = false;
                            this.loadTable();
                        } else {
                            this.messageService.showErrorViaToast('Error', response.msg);
                            this.formController.get('validate_password').setValue('')
                        }

                    }).catch((error) => {
                        this.messageService.showErrorViaToast('Error', error);
                        console.log(error);
                    });

                } else {
                    this.messageService.showErrorViaToast('Error', 'Form is not valid');
                }
            },
        });
    }

    changeStatus(){

        const formData = new FormData();

        formData.append('id', this.userToedit.id.toString());
        
        WithAuthRequest(appConfigurations.userChangeStatus, {
            method: 'POST',
        }, formData).then((response: any) => {

            if(response.status){
                this.messageService.showSuccessViaToast('Success', 'Status changed');
                this.loadTable();
            } else {
                this.messageService.showErrorViaToast('Error', response.msg);
                this.userToeditIsActive = this.userToedit.status == 1 ? true : false;
            }
        }).catch((error) => {
            console.error(error);
            this.messageService.showErrorViaToast('Error', error);
            this.userToeditIsActive = this.userToedit.status == 1 ? true : false;
        }).finally(() => {
            this.userVisibleDialog = false;
        })     
    }

    changePassword(){
        this.confirmationService.confirm({
            header: 'Please complete the fields',
            acceptIcon:"none",
            rejectIcon:"none",
            rejectButtonStyleClass:"p-button-text",
            key: 'changePassword',
            accept: () => {
                if (this.formPasswordController.valid) {

                    const formData = new FormData();

                    formData.set('id', this.formPasswordController.get('id')?.value);
                    formData.set('validate_password', this.formPasswordController.get('validate_password')?.value);
                    formData.set('new_password', this.formPasswordController.get('new_password')?.value);
                    formData.set('comfirm_password', this.formPasswordController.get('comfirm_password')?.value);

                    WithAuthRequest(appConfigurations.customUserChangePassword, {
                        method: 'POST',
                    }, formData).then((response: any) => {

                        if(response.status){
                            this.messageService.showSuccessViaToast('Success', 'Password changed');
                        } else {
                            this.messageService.showErrorViaToast('Error', response.msg);
                        }
                        
                    }).catch((error) => {
                        this.messageService.showErrorViaToast('Error', error);
                        console.log(error);
                    }).finally(() => {                        
                        this.formPasswordController.get('validate_password').setValue('');
                        this.formPasswordController.get('new_password').setValue('');
                        this.formPasswordController.get('comfirm_password').setValue('');                        
                    })

                } else {
                    this.messageService.showErrorViaToast('Error', 'Form is not valid');
                }
            },
            reject: () => {
            }
        });
    }

    changeProfileImage(){
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = false;
        input.onchange = () => {
            this.imageFileUpload = input.files[0]           
            this.showComfirmation();
        }
        input.click();
    }

    addNewUser(){
        if(this.formCreateUserController.valid){

            const formData = new FormData();

            formData.set('user_name', this.formCreateUserController.get('user_name')?.value);
            formData.set('email', this.formCreateUserController.get('email')?.value);
            formData.set('password', this.formCreateUserController.get('password')?.value);
            formData.set('name', this.formCreateUserController.get('name')?.value);
            formData.set('last_name', this.formCreateUserController.get('last_name')?.value);
            formData.set('rol', this.formCreateUserController.get('rol')?.value?.code);            

            WithAuthRequest(appConfigurations.createNewUser, {
                method: 'POST',
            }, formData).then((response: any) => {
                if(response.status){
                    this.messageService.showSuccessViaToast('Success', 'User created');
                    this.useraddVisibleDialog = false;
                    this.loadTable();

                    this.formCreateUserController.get('user_name').setValue('');
                    this.formCreateUserController.get('email').setValue('');
                    this.formCreateUserController.get('password').setValue('');
                    this.formCreateUserController.get('name').setValue('');
                    this.formCreateUserController.get('last_name').setValue('');
                    this.formCreateUserController.get('rol').setValue('');

                } else {
                    this.messageService.showErrorViaToast('Error', response.msg);
                }
            }).catch((error) => {
                this.messageService.showErrorViaToast('Error', error);
                console.log(error);
            })

        } else {
            this.messageService.showWarnViaToast('Alert', 'Form is not valid');
        }
    }

}