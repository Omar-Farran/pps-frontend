import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Installment } from 'src/app/data/installment';
import { ProductLineItem } from 'src/app/data/product-line-item';
import { InvoiceType } from 'src/app/shared/models/enum';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent {
entity:any;
id:number;
products:ProductLineItem[];
installments:Installment[];
hideQuotationValues:boolean = false;
isPurchase:boolean;
  constructor
      (
        private route:ActivatedRoute,
        private baseService: BaseService,
      private router:Router)
      {
             this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.GetById();
      this.getProductLineItems(this.id);
      this.getInvoiceInstallments(this.id);
      
    });

      }
      private GetById() {
    this.baseService.Get('Invoice', `View/${this.id}`).subscribe
      (res => {
        this.entity = res;
        //Quotation & Purchase Request
        if(this.entity.type == 3 || this.entity.type == 4){
          this.hideQuotationValues = true;
        }
        this.isPurchase = this.entity.type == InvoiceType.PurchaseInvoice || this.entity.type == InvoiceType.PurchaseRequestInvoice;
      })
    }

      getProductLineItems(invoiceid:number){
        this.baseService.Get('Invoice' , 'GetProductLineItems/' + invoiceid).subscribe(res => {
          if(res){
          this.products = res as ProductLineItem[];
          }
        })
      }

         getInvoiceInstallments(invoiceid:number){
          this.baseService.Get('Invoice' , 'GetInvoiceInstallments/' + invoiceid).subscribe(res => {
            debugger;
            this.installments = res as Installment[];
          })
        }

        navigate(){
          switch(this.entity.type){
            case InvoiceType.QuotationInvoice:
            this.router.navigate(['/invoice-management/quotation'])
            break;
             case InvoiceType.SalesInvoice:
            this.router.navigate(['/invoice-management/sales-invoice'])
            break;
             case InvoiceType.PurchaseRequestInvoice:
            this.router.navigate(['/purchase-management/purchase-request-invoice'])
            break;
             default:
            this.router.navigate(['/purchase-management/purchase-invoice'])
            break;
          }
        }
}
