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
        if(this.entity.type == 3){
          this.hideQuotationValues = true;
        }
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
          if(this.entity.type == 1){
            this.router.navigate(['/invoice-management/sales-invoice'])
          }else {
            this.router.navigate(['/invoice-management/quotation'])
          }
        }
}
