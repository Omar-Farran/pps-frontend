import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { SelectItem } from 'src/app/data/select-item';
import { ProductLineItem } from 'src/app/data/product-line-item';
import { InvoiceStatus, InvoiceType, ProductTypeEnum, productTypes } from '../../models/enum';

@Component({
  selector: 'app-product-line-items',
  templateUrl: './product-line-items.component.html',
  styleUrls: ['./product-line-items.component.scss']
})
export class ProductLineItemsComponent  implements OnChanges {
@Input() productItems:ProductLineItem[] = [];
@Output() productItemsOutput:any;
@Input() branchId:number;
@Input() warehouseSectionId:number;
@Input() sourceType:any;
@Input() sourceId:any;
@Input() invoice:any;
filteredProducts:any;
isPurchase:boolean = false;
itemLabel:any;
showReserve:boolean;
 constructor
    (
      private baseService: BaseService
    ) 
    {

      
    }
  ngOnChanges(changes: SimpleChanges): void {
  if(this.productItems.length == 0){
        let product = new ProductLineItem();
        product.index = 0;
        this.productItems.push(product);
      }else {
        this.productItems = this.productItems.map(prod => {
    prod.quantityDb = prod.quantity;
    prod.reserveDb = prod.reserve; 
    return prod;
        })
      }

      this.showReserve = this.invoice.type != 3;
      if(this.invoice.type == InvoiceType.PurchaseInvoice || this.invoice.type == InvoiceType.PurchaseRequestInvoice){
         this.isPurchase = true;
        this.showReserve = false;
      }
    

  }


  filterProducts(event: any) {
    const query = event.query.toLowerCase();
    this.getSelectItemList(query);
  }

  getSelectItemList(query){
    this.baseService.Get('Product' , 'GetSelectItemsList?query=' + query + '&isPurchase=' + this.isPurchase ).subscribe(res => {
      this.filteredProducts = (res as SelectItem[]).filter(product =>
  this.productItems.every(item => item.product?.id !== product.id)
);
    })
  }


  addRow(){
    let newProductItemLine = new ProductLineItem();
    newProductItemLine.index = this.productItems.length
      this.productItems.push(newProductItemLine);
    }

    removeRow(index){
  this.productItems = this.productItems.filter(x=> x.index != index);
  let i = 0;
  this.productItems = this.productItems.map(item => {
    item.index = i;
    i++;
    return item;
  })
}

onSelectProduct(lineItem: any, event: any) {
  const productId = event?.value?.id;
  debugger;
  if (!productId) return;
  this.baseService.Get('Product', 'GetProductLineItem?SourceType='+ this.sourceType + '&invoiceType=' + this.invoice.type +  '&SourceId=' +  this.sourceId + '&Id=' + productId).subscribe(res => {
    const productLineItem = res as ProductLineItem;
    this.productItems[lineItem.index] = productLineItem;
    this.productItems[lineItem.index].product = event.value;
    this.productItems[lineItem.index].productId = event.value.id;
    this.productItems[lineItem.index].index = lineItem.index;
    this.productItems[lineItem.index].quantity = 1;
    this.showReserve = productLineItem.type == ProductTypeEnum.Product; 
    this.calculateTotal(this.productItems[lineItem.index] , 'quantity');
});


}

calculateTotal(item: any , value) {
  if(item[value] < 1){
    item[value] = 0;
    if(value == 'quantity' || value == 'unitPrice')
     item.isInValid = true;
  } else {
    if(item.quantity > 0 && item.unitPrice > 0)
     item.isInValid = false;
    else 
    item.isInValid = true;
  }
  this.validateQuantity(item);
  const price = item.unitPrice || 0;
const discount = item.discount || 0; // percentage
const tax = item.tax || 0;           // percentage
const quantity = item.quantity || 0;
const fees = item.feesAmount || 0;
const discountedPrice = price - (price * discount / 100);
const taxedPrice = discountedPrice + (discountedPrice * tax / 100);
 this.productItems[item.index].total = ((taxedPrice * quantity) + fees).toFixed(3);
}

validateQuantity(item){
    let isNotValid = item.quantity > (item.maxQuantity + (item.reserveDb && this.invoice.status != InvoiceStatus.Draft ? item.quantityDb ?? 0 : 0));
    if(isNotValid){
      item.isInValid = true;
    } else {
       item.isInValid = false;
    }

}

}
