import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer, ToastrService } from 'ngx-toastr';
import { GlobalStatus, GlobalStatusArr, LookpusType } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { maxValueValidator } from 'src/app/utils/maxValueValidator';
import { arabicTextWithNumbersValidator, englishTextWithNumbersValidator } from 'src/app/utils/validation-text';
import { noWhitespaceValidator } from 'src/app/utils/validation-white-space';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  imageUrl:string = '';
  activeIndex: number = 0;
  showFollowItemDiv:boolean = false;
  isCompleted: boolean;
  isFormSubmitted:boolean = false;
  isDetailsFormSubmitted:boolean = false;
  imageFile:any;
  public status = GlobalStatusArr
  categories:any[];
  unitOfMeasures:any[];
  followTypes:any[];
  baseUrl = environment.attachmentUrl;
  warehouses:any;
  sections:any;
    @Input() isCompanyUser:boolean = false;
    @Input() modal: any = null
    @Input() isEditMood: boolean = false
    @Input() id: number
    private entity: any = null;

    basicForm = new FormGroup
    (
      {
        id: new FormControl(0),
        barCode:new FormControl(null),
        nameEn: new FormControl('', [Validators.required,englishTextWithNumbersValidator,noWhitespaceValidator() , Validators.maxLength(100)]),
        nameAr: new FormControl('', [Validators.required, arabicTextWithNumbersValidator(), noWhitespaceValidator() ]),
        purchasePrice: new FormControl(null, [Validators.required ]),
        sellPrice: new FormControl(null, [Validators.required ]),
        unitOfMeasureId:new FormControl(null ,  [Validators.required ]),
        categoryId:new FormControl(null ,  [Validators.required ]),
        isActive: new FormControl(false),
        hasBarCode:new FormControl(false)

      }
    );
     detailsForm = new FormGroup ({
     descriptionEn: new FormControl('', [englishTextWithNumbersValidator,noWhitespaceValidator() , Validators.maxLength(100)]),
     descriptionAr: new FormControl('', [arabicTextWithNumbersValidator(), noWhitespaceValidator() ]),
     salesTax: new FormControl(null),
     discount: new FormControl(null, [maxValueValidator(100)]),
     Image:new FormControl(),
     followItem: new FormControl(false),
     onlyDefault: new FormControl(false),
     followType:new FormControl(null),
     quantityValue:new FormControl(0),
     expDate:new FormControl(),
     expirationDays: new FormControl(),
        currentStock:new FormControl(null),
        defaultWarehouseId:new FormControl(null),
        warehouseSectionId: new FormControl(null)
    })
   followForm = new FormGroup({

   })
  steps = [];
   constructor
    (
      private baseService: BaseService,
      public authSerivce: AuthService,
      private overlay: OverlayContainer,
      private toastr: ToastrService,
      private translate: TranslateService,
    ) 
    {}
    ngOnInit (): void 
    {
      
      if (this.isEditMood && this.id) {
        this.GetById()
        this.basicForm.get('barCode').disable();
      }
      this.getCategories();
      this.getUnitOfMeasures();
      this.getWarehouses();
      
      this.steps = [
    { label: this.translate.instant('product-management.basicInfo'), command: () => (this.activeIndex = 0) },
    { label: this.translate.instant('product-management.details'), command: () => (this.activeIndex = 1) }
      ]

      this.followTypes = [
        { id:0 , title:this.translate.instant('product-management.quantity')},
        { id:1 , title:this.translate.instant('product-management.expiry')},
        { id:2 , title:this.translate.instant('product-management.both')}
      ]

       this.detailsForm.get('followType').disable();
    }
  
    

    next() {
      if(this.activeIndex  == 0){
        this.isFormSubmitted = true;
        this.isDetailsFormSubmitted = true;
        this.basicForm.markAllAsTouched();
        if(this.basicForm.valid){
        this.activeIndex++;
        }
      }else if(this.activeIndex == 1 ){
        this.detailsForm.markAllAsTouched();
        if(this.detailsForm.valid){
          this.submitForm();
        }
      }
  }

  previous() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }
  

    //#endregion
    
    //#region Functions
    resetForm () 
    {
       this.basicForm.reset();
    }
    submitForm (): void 
    {
     this.isFormSubmitted = true
    if (this.basicForm.invalid || this.detailsForm.invalid)
    {
      this.basicForm.markAllAsTouched()
      this.detailsForm.markAllAsTouched()
      return;
    }
    const ApiPath = this.isEditMood ? 'Update' : 'Post';
    const ControllerPath = 'Product'
    let date = this.detailsForm.value.expDate;
    if(this.detailsForm?.value?.expDate && !this.isCompanyUser) {
     date = new Date(date.year, date.month - 1, date.day).toISOString().split('T')[0];
    }

   const combinedData = {
    ...this.basicForm.getRawValue(),
    ...this.detailsForm.getRawValue(),
    imageFile: this.imageFile,
    status: this.basicForm?.value?.isActive ? GlobalStatus.Active : GlobalStatus.Inactive,
    expirationDate:date
  };
    
    this.baseService.postItemFromForm(ControllerPath , ApiPath , combinedData).subscribe
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
    this.baseService.Get('Product', `Get/${this.id}`).subscribe
      (res => {
        this.entity = res;
        if(this.entity?.imagePath)
        this.entity.imagePath = `${this.baseUrl}/${this.entity.imagePath}`;
        this.basicForm.patchValue
          (
            {
                id: this.entity.id,
                barCode:this.entity.barCode,
                nameEn: this.entity.nameEn,
                nameAr: this.entity.nameAr,
                isActive: this.entity.isActive,
                categoryId:this.entity.categoryId,
                unitOfMeasureId:this.entity.unitOfMeasureId,
                sellPrice:this.entity.sellPrice,
                purchasePrice:this.entity.purchasePrice
             }
          );
       const date = this.entity.expirationDate ?  new Date(this.entity.expirationDate) : null;
       this.detailsForm.patchValue
          (
            {
                descriptionAr:this.entity.descriptionAr,
                descriptionEn: this.entity.descriptionEn,
                followType:this.entity.followType,
                followItem: this.entity.followItem,
                onlyDefault: this.entity.onlyDefault,
                expirationDays:this.entity.expirationDays,
                quantityValue:this.entity.quantityValue,
                salesTax:this.entity.salesTax,
                discount:this.entity.discount,
                currentStock:this.entity.currentStock,
                defaultWarehouseId:this.entity.DefaultWarehouseId,
                warehouseSectionId: this.entity.WarehouseSectionId,
                expDate: date ? {
                          year: date.getFullYear(),
                          month: date.getMonth() + 1, // Note: JS months are 0-based
                          day: date.getDate()
                        } : null,
                  

             }
          );


      }
      )
  }

  onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files?.length > 0) {
    this.imageFile = input.files[0];
        }
  }

  getCategories(){
      this.baseService.getLookupsByType(LookpusType.Category).subscribe(res => {
        this.categories = res;
      });
    }

     getUnitOfMeasures(){
      this.baseService.getLookupsByType(LookpusType.unitOfMeasures).subscribe(res => {
        this.unitOfMeasures = res;
      });
    }

  onHasBarCodeChange() {
  const barCodeControl = this.basicForm.get('barCode');
  if (this.basicForm.get('hasBarCode')?.value) {
    barCodeControl?.setValidators(Validators.required);
  } else {
    barCodeControl.setValue(null);
    barCodeControl?.clearValidators();
  }
  barCodeControl?.updateValueAndValidity(); // This is essential
}

    getWarehouses(){
      this.baseService.Get('Warehouse' , 'GetAll').subscribe(res => {
        this.warehouses = res; 
      })
    }

      onWarehouseChange(warehouseId:number){
   this.getWarehouseSections(warehouseId);
   if(warehouseId > 0){
    this.detailsForm.get('warehouseSectionId').setValidators(Validators.required);
    this.detailsForm.get('currentStock').setValidators(Validators.required);
   }else {
    this.detailsForm.get('warehouseSectionId')?.clearValidators();
    this.detailsForm.get('currentStock')?.clearValidators();
   }
  }

      getWarehouseSections(warehouseId:number){
      if(warehouseId > 0){
this.baseService.Get('WarehouseSections' , 'GetSectionsByWarehouseId/' + warehouseId ).subscribe(res => {
  this.sections = res;
})}}


onFollowItemChange(value){
  if(value){
    this.detailsForm.get('followType').setValue(0);
  }else {
    this.detailsForm.get('followType').setValue(null);
  }
}
}
