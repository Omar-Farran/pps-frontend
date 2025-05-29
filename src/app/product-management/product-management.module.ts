import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DropdownModule } from 'primeng/dropdown';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { FormWizardModule } from '../shared/components/form-wizard/form-wizard.module';
import { StepsModule } from 'primeng/steps';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
          NgbNavModule,
          NgxPaginationModule,
          SharedModule,
          ReactiveFormsModule,
          NgxMatIntlTelInputComponent,
          ProductManagementRoutingModule,
          MultiSelectModule,
          NgbModule,
          MatFormFieldModule,
          MatSelectModule,
          DropdownModule,
          NgbDatepickerModule,
          FormWizardModule,
          FormsModule,
          StepsModule
  ]
})
export class ProductManagementModule { }
