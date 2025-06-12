import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'src/app/data/select-item';
import { BaseService } from 'src/app/shared/services/base.service';
import { DirectionService } from 'src/app/shared/services/change-language.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 
@Component({
  selector: 'app-inventory-counting',
  templateUrl: './inventory-counting.component.html',
  styleUrls: ['./inventory-counting.component.scss']
})
export class InventoryCountingComponent {
  columns: any[] = [
    { name: "inventory-counting.warehouse", field: "warehouseName" },
    { name: "inventory-counting.section", field: "sectionName" },
    { name: "inventory-counting.product", field: "productName" },
    { name: "inventory-counting.countDate", field: "countDate", type: 'date' },
    { name: "inventory-counting.actualQuantity", field: "actualQuantity", type: 'number' },
    { name: "inventory-counting.systemQuantity", field: "systemQuantity", type: 'number' },
    { name: "inventory-counting.quantityDifference", field: "quantityDifference", type: 'number' },
  ];

  locale: string;
  actionList: any[] = [];
  searchProduct: string;
  products: any[];
  branchies: any[];
  sections: any;
  warehouses: any;
  dataSource: any[] = [];
  filteredProducts: SelectItem[];
  totalCount: number = 0
  id: number = null
  public searchForm = new FormGroup
    (
      {
        warehouseId: new FormControl(null),
        productId: new FormControl(null),
        sectionId: new FormControl(null),
        product: new FormControl(null)
      }
    )
  baseSearch =
    {
      warehouseId: null,
      branchId: null,
      productId: null,
      sectionId: null,
      pageSize: 25,
      pageNumber: 0,
    }

  isFormSubmitted = false;
  public calculationForm = new FormGroup({
    warehouseId: new FormControl(null, Validators.required),
    sectionId: new FormControl(null, Validators.required),
    product: new FormControl(null, Validators.required),
    actualQuantity: new FormControl(null, Validators.required),
    countDate: new FormControl({ value: this.getLocalDateString(), disabled: true })
  });

  constructor
    (
      private baseService: BaseService,
      public directionService: DirectionService,
      private translate: TranslateService,
      private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
    this.getList()
    this.onSearch()
    this.getProducts();
    this.getBranchies();
    this.getWarehouses();
    this.locale = this.directionService.getCurrentLanguage();
    this.searchProduct = this.translate.instant('transaction.seasrch-product')

  }
  //#region Getters
  private getList() {
    this.baseService.Post('InventoryCounting', 'List', this.baseSearch).subscribe
      (res => {
        this.dataSource = (res as any).entities
        this.totalCount = (res as any).totalCount
      }
      )

  }
  //#endregion
  //#region Actions Handler

  //#endregion
  //#region Filtering and Searching
  onSearch() {
    let form = this.searchForm.getRawValue();
    if (form) {
      this.baseSearch.warehouseId = form.warehouseId;
      this.baseSearch.sectionId = form.sectionId;
      if (form.product) {
        this.baseSearch.productId = form.product.id;
      }
    }

    this.baseSearch.pageNumber = 0;
    this.getList();
  }
  onPageChange(event: any): void {
    this.baseSearch.pageNumber = event.PageIndex - 1;
    this.baseSearch.pageSize = event.pageSize;
    this.getList();
  }
  //#endregion


  onHandleAction(event) {
    switch (event.action.name) {
      case "common.edit":
        {

        }
        break;
      case "common.updatestatus":
        {
        }
        break;
      case "common.info":
        {
        }
        break;
    }
  }


  getProducts() {
    this.baseService.Get('Product', 'GetAll').subscribe(res => {
      this.products = res as any[];;
    })
  }

  getBranchies() {
    this.baseService.Get('Branch', 'GetAll').subscribe(res => {
      this.branchies = res as any[];
    })
  }


  getWarehouses() {
    this.baseService.Get('Warehouse', 'GetAll').subscribe(res => {
      this.warehouses = res;
    })
  }

  getWarehouseSections(warehouseId: number) {
    if (warehouseId > 0) {
      this.baseService.Get('WarehouseSections', 'GetSectionsByWarehouseId/' + warehouseId).subscribe(res => {
        this.searchForm.get('sectionId').setValue(null);
        this.sections = res;
      })
    }
  }

  resetSearchForm() {
    this.searchForm.reset();
    this.onSearch();
  }

  filterProducts(event: any) {
    const query = event.query.toLowerCase();
    this.getSelectItemList(query);
    // this.filteredProducts = this.products.filter(product =>
    //   product.name.toLowerCase().includes(query)
    // );
  }

  getSelectItemList(query) {

    this.baseService.Get('Product', 'GetSelectItemsList?query=' + query).subscribe(res => {
      this.filteredProducts = res as SelectItem[];
    })
  }

  onSubmit() {
    this.isFormSubmitted = true;

    if (this.calculationForm.invalid) {
      return;
    }
    let form = this.calculationForm.getRawValue();
    if (form) {
      debugger;
      form['productId'] = form.product.id
      this.baseService.Post('InventoryCounting', 'Calculation', form).subscribe
        (res => {
          // this.dataSource = (res as any).entities
          // this.totalCount = (res as any).totalCount
        }
        )

    }

    this.baseSearch.pageNumber = 0;
    this.getList();
  }
  calculateGap() {
    const actual = this.calculationForm.get('actualQuantity')?.value || 0;
    const system = this.calculationForm.get('systemQuantity')?.value || 0;
    const gap = actual - system;
  }

  resetCalculationForm() {
    this.isFormSubmitted = false;
    this.calculationForm.reset();
    this.calculationForm.patchValue({
      countDate: this.getLocalDateString()
    })
  }
  getLocalDateString(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
