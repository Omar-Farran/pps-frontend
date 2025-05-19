import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { DropdownModule } from 'primeng/dropdown';
import { ProductionProductsRoutingModule } from './production-products-routing.module';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { SharedComponentsModule } from '../shared/components/shared-components.module';

@NgModule({
    declarations: [
        CategoryListComponent,
        CategoryFormComponent,
    ],
    imports: [
        CommonModule,
        NgbNavModule,
        NgxPaginationModule,
        SharedModule,
        ReactiveFormsModule,
        NgxMatIntlTelInputComponent,
        MultiSelectModule,
        NgbModule,
        MatFormFieldModule,
        MatSelectModule,
        DropdownModule,
        ProductionProductsRoutingModule,
        SharedComponentsModule
    ]
})
export class ProductionProductsModule { }
