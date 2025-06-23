export class ProductLineItem {
    id:number;
    unitMeasure:number;
    quantity:number;
    unitPrice:number;
    discount:number;
    tax:number;
    feesAmount:number;
    total:number;
    reserve:boolean;
    index:number;
    product:any;
    productId:number;
    maxQuantity:number;
    quantityDb:number = 0;
    reserveDb:boolean;
    isInValid:boolean;
}

