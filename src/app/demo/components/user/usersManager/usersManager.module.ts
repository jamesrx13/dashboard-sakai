import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersManagerRoutingModule } from './usersManager-routing.module';
import { UsersManagerComponent } from './usersManager.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PasswordModule } from 'primeng/password';
import { TableDemoRoutingModule } from '../../uikit/table/tabledemo-routing.module';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    imports: [
        CommonModule,
        UsersManagerRoutingModule,
		TableModule,
		FormsModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
		ConfirmDialogModule,
		ReactiveFormsModule,
		PasswordModule,
		TableDemoRoutingModule,
		PaginatorModule,
    ],
    declarations: [UsersManagerComponent]
})
export class UsersManagerModule { }
