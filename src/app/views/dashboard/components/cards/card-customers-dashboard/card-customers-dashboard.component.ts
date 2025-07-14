import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-card-customers-dashboard',
  templateUrl: './card-customers-dashboard.component.html',
  styleUrls: ['./card-customers-dashboard.component.scss']
})
export class CardCustomersDashboardComponent implements OnInit {
  model:any;
  constructor(private baseService:BaseService,
    private router:Router) { }

  ngOnInit(): void {
  this.getInvoiceStatistics();
  }

  getInvoiceStatistics(){
    this.baseService.Get('Dashboard' , 'GetInvoicesStatistics').subscribe(res => {
  this.model = res;
    })
  }

  goToSalesList(){
   this.router.navigate(['invoice-management/sales-invoice'])
  }

  goToAddNewSalesInvoice(){
   this.router.navigate(['invoice-management/sales-invoice/form'])
  }

    goToPurchaseList(){
   this.router.navigate(['purchase-management/purchase-invoice'])
  }

  goToAddNewPurchaseInvoice(){
   this.router.navigate(['purchase-management/purchase-invoice/form'])
  }

}
