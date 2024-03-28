import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SesionManagerComponent } from './sesionManager.component'; 
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
import { SesionManagerRoutingModule } from './sesionManager-routing.module';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [
        CommonModule,
		SesionManagerRoutingModule,
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
		PaginatorModule,
		DialogModule,
		TagModule, 
		InputSwitchModule, 
		TableModule,
    ],
    declarations: [SesionManagerComponent]
})
export class SesionManagerModule { }
