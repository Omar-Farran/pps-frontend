import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer, ToastrService } from 'ngx-toastr';
import { TransactionVM } from 'src/app/data/transaction';
import { ClientType, LookpusType, TransactionTypes, transactionTypes } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { arabicTextWithNumbersValidator, englishTextWithNumbersValidator } from 'src/app/utils/validation-text';
import { noWhitespaceValidator } from 'src/app/utils/validation-white-space';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent {
 isFormSubmitted:boolean = false;
  logoFile:any;
  currencies:any[];
  transactionItems:any[] = [
  ];

  transferType = TransactionTypes.Transfer;
  exportToBranchType = TransactionTypes.ExportToBranch;

    @Input() modal: any = null
    @Input() isEditMood: boolean = false
    @Input() id: number
    private entity: any = null;
   warehouses:any[] = [{id:1 , name:'Warehouse A'}]
   sections:any[] = [{id:2 , name:'Section A'}]
   types:any[]  = transactionTypes;
   branchies:any;
   customers:any;
   products:any;
  steps = [];
  activeIndex: number = 0;

    form = new FormGroup
    (
      {
        id: new FormControl(0),
        orderId : new FormControl(null),
        type: new FormControl(0, [Validators.required]),
        customerId: new FormControl(null ),
        warehouseId:new FormControl(null),
        sectionId:new FormControl(null),
        toWarehouseId: new FormControl(null),
        toSectionId:new FormControl(null),
        toBranchId:new FormControl(null),
        notes:new FormControl(null),
        transactionProducts:new FormControl()
      }
    );
    //#endregion
    constructor
    (
      private baseService: BaseService,
      private languageService: LanguageService,
      public authSerivce: AuthService,
      private overlay: OverlayContainer,
      private toastr: ToastrService,
      private translate: TranslateService
    ) 
    {}
    ngOnInit (): void 
    {
            this.steps = [
    { label: this.translate.instant('transaction.transaction'), command: () => (this.activeIndex = 0) },
    { label: this.translate.instant('transaction.transactionitems'), command: () => (this.activeIndex = 1) }
      ]

      if (this.isEditMood && this.id) 
        this.GetById()
      else {
        this.transactionItems = [
  {index: 0 ,productId:0 , orderedQuantity: 0 , quantity:0}
  ];
      }
      this.getBranchies();
      this.getProducts();
      this.getCustomers(ClientType.Supplier);
    }
    //#region Functions
    resetForm () 
    {
       this.form.reset();
    }
    submitForm (): void 
    {
        this.isFormSubmitted = true
    if (this.form.invalid)
    {
      this.form.markAllAsTouched()
      return;
    }
  
    const allProductsValid = this.transactionItems.every(
        item =>  item.productId > 0 && item.quantity > 0 && item.orderedQuantity > 0
            );
            if(!allProductsValid){
               this.toastr.error(this.translate.instant('transaction.oneOfTheProductInvalid'))
               return;
            }


    const ApiPath = this.isEditMood ? 'Update' : 'Post';
    const ControllerPath = 'Transaction'
    
    let form = this.form.getRawValue();
    form.transactionProducts = this.transactionItems;
    form.type = Number(form.type);
    this.baseService.Post(ControllerPath , ApiPath , form).subscribe
    ( res => { this.modal.close();

       this.toastr.success(
       this.translate.instant(this.isEditMood ? 'successUpdated' : "successAdded"),
       this.translate.instant("success"),
    { timeOut: 3000 }
  );
     }
    )
 
    }

      private GetById() {
    this.baseService.Get('Branch', `Get/${this.id}`).subscribe
      (res => {
        this.entity = res;
        this.form.patchValue
          (
            {
                id: this.entity.id,
            }
          );
      }
      )
  }

  getBranchies(){
      this.baseService.Get('Branch' , 'GetAll').subscribe(res => {
        this.branchies  = res;
      });
    }
  getProducts(){
      this.baseService.Get('Product' , 'GetAll').subscribe(res => {
        this.products  = res;
      });
    }


    next() {
      if(this.activeIndex < this.steps.length - 1) {
    this.activeIndex++;
      }
  }

  previous() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

   addRow(){
      this.transactionItems.push(
      {index: this.transactionItems.length, productId:0 , orderedQuantity: 0 , quantity:0}
      )
    }
removeRow(index){
  this.transactionItems = this.transactionItems.filter(x=> x.index != index);
}

 getCustomers(type:any){
  if( type == TransactionTypes.Reciving ||  type == TransactionTypes.Issueance){
      let clientType = type == TransactionTypes.Reciving ? ClientType.Supplier :  ClientType.Customer;
      this.baseService.Get('Customers' , 'GetAll?type='   + clientType ).subscribe(res => {
        this.customers  = res;
      });
  }
    }

}
