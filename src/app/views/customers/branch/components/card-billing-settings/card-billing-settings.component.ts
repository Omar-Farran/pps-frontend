import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-billing-settings',
  templateUrl: './card-billing-settings.component.html',
  styleUrls: ['./card-billing-settings.component.scss']
})
export class CardBillingSettingsComponent {
  @Input() dataCustomerBilling;
}
