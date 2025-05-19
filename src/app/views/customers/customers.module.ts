import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressesComponent } from './addresses/addresses.component';
import { SlaComponent } from './sla/sla.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersManagementComponent } from './customers-management/customers-management.component';
import { CustomersNewComponent } from './customers-new/customers-new.component';
import { ImageCropperModule } from 'ngx-img-cropper';
import { CustomersProfileComponent } from './customers-profile/customers-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BranchComponent } from './branch/branch.component';
import { SharedComponentsModule } from "../../shared/components/shared-components.module";
import { BranchEmptyDataComponent } from './branch-empty-data/branch-empty-data.component';
import { CardSlaComponent } from './branch/components/card-sla/card-sla.component';
import { CardBranchInformationComponent } from './branch/components/card-branch-information/card-branch-information.component';
import { CardAddressComponent } from './branch/components/card-address/card-address.component';
import { CardEInvoiceComponent } from './branch/components/card-e-invoice/card-e-invoice.component';
import { CardAttachmentsComponent } from './branch/components/card-attachments/card-attachments.component';
import { NotDataComponent } from './branch/components/not-data/not-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatSelectCountryModule } from "@angular-material-extensions/select-country";
import { CalendarModule } from 'primeng/calendar';
import { HttpClientModule } from '@angular/common/http';
import { BillingSettingsComponent } from './billing-settings/billing-settings.component';
import { CardGeneralInformationComponent } from './billing-settings/components/card-general-information/card-general-information.component';
import { CardShippingChargesComponent } from './billing-settings/components/card-shipping-charges/card-shipping-charges.component';
import { CardCodChargesComponent } from './billing-settings/components/card-cod-charges/card-cod-charges.component';
import { CardCustomsDutyComponent } from './billing-settings/components/card-customs-duty/card-customs-duty.component';
import { CardBillingProfilesComponent } from './billing-settings/components/card-billing-profiles/card-billing-profiles.component';
import { CardBillingSettingsComponent } from './branch/components/card-billing-settings/card-billing-settings.component';
import { ManageBillingSettingsComponent } from './manage-billing-settings/manage-billing-settings.component';

@NgModule({
    declarations: [
        AddressesComponent,
        CustomersManagementComponent,
        CustomersProfileComponent,
        BranchComponent,
        BranchEmptyDataComponent,
        CardSlaComponent,
        CardBranchInformationComponent,
        CardAddressComponent,
        CardEInvoiceComponent,
        CardAttachmentsComponent,
        CustomersNewComponent,
        NotDataComponent,
        SlaComponent,
        BillingSettingsComponent,
        CardGeneralInformationComponent,
        CardShippingChargesComponent,
        CardCodChargesComponent,
        CardCustomsDutyComponent,
        CardBillingProfilesComponent,
        CardBillingSettingsComponent,
        ManageBillingSettingsComponent
    ],
    imports: [
        CommonModule,
        CustomersRoutingModule,
        NgbModule,
        SharedComponentsModule,
        FormsModule,
        ImageCropperModule,
        ReactiveFormsModule,
        NgxMatIntlTelInputComponent,
        MatSelectCountryModule.forRoot('en'),
        CalendarModule,
        HttpClientModule
    ]
})
export class CustomersModule { }
