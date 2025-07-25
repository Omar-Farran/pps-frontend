import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageService } from 'src/app/shared/services/language.service';
export interface IMenuItem {
    id?: string;
    title?: string;
    description?: string;
    type: string;       // Possible values: link/dropDown/extLink
    name?: string;      // Used as display text for item and title for separator type
    state?: string;     // Router state
    icon?: string;      // Material icon name
    tooltip?: string;   // Tooltip text
    disabled?: boolean; // If true, item will not be appeared in sidenav.
    sub?: IChildItem[]; // Dropdown items
    badges?: IBadge[];
    active?: boolean;
    permissions?: string
}
export interface IChildItem {
    id?: string;
    parentId?: string;
    type?: string;
    name: string;       // Display text
    state?: string;     // Router state
    icon?: string;
    sub?: IChildItem[];
    active?: boolean;
    permissions?: string

}

interface IBadge {
    color: string;      // primary/accent/warn/hex color codes(#fff000)
    value: string;      // Display text
}

interface ISidebarState {
    sidenavOpen?: boolean;
    childnavOpen?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public sidebarState: ISidebarState = {
        sidenavOpen: true,
        childnavOpen: false
    };
    selectedItem: IMenuItem;

    constructor
        (
            public languageService: LanguageService
        ) { }
    defaultMenu: IMenuItem[] = [
        {
            name: 'navigation.dashboard',
            type: 'dropDown',
            icon: 'i-Bar-Chart',
            permissions: 'Dashboards',
            sub: [
                {
                    name: 'V1',
                    state: 'dashboard/v1',
                    type: 'link',
                    permissions: 'Dashboards'
                }
                // ,
                // {
                //     name: 'V2',
                //     state: '/dashboard/v2',
                //     type: 'link',
                //     permissions: 'Dashboards'
                // },
                // {
                //     name: 'V3',
                //     state: '/dashboard/v3',
                //     type: 'link',
                //     permissions: 'Dashboards'
                // },
                // {
                //     name: 'V4',
                //     state: '/dashboard/v4',
                //     type: 'link',
                //     permissions: 'Dashboards'
                // },
            ]
        },
        {
            name: 'navigation.company-management',
            type: 'dropDown',
            icon: 'i-Men',
            permissions: 'Company-Management',
            sub: [
                {
                    name: 'navigation.Companies',
                    state: '/company-management/companies',
                    type: 'link',
                    permissions: 'Company-List'
                },
                {
                    name: 'navigation.Branchies',
                    state: '/company-management/branchies',
                    type: 'link',
                    permissions: 'Branch-List'
                },
                {
                    name: 'navigation.Customers',
                    state: '/company-management/customers',
                    type: 'link',
                    permissions: 'Customers-List'
                },
                {
                    name: 'navigation.Suppliers',
                    state: '/company-management/suppliers',
                    type: 'link',
                    permissions: 'Suppliers-List'
                },
            ]
        },
        {
            name: 'navigation.users_management',
            type: 'dropDown',
            icon: 'i-Men',
            permissions: 'User-Management',
            sub: [
                {
                    name: 'navigation.manage_admins',
                    state: '/user-managment/users',
                    type: 'link',
                    permissions: 'User-List'
                },
                {
                    name: 'navigation.manage_roles',
                    state: '/user-managment/roles',
                    type: 'link',
                    permissions: 'Roles-List'
                }
            ]
        },
        {
            name: 'navigation.settings_management',
            type: 'dropDown',
            icon: 'i-Data-Settings',
            permissions: 'Lookups-Management',
            sub: [
                // {
                //     name: 'navigation.Nationality',
                //     state: '/lookups-managment/nationality/11',
                //     type: 'link',
                //     permissions: 'Lookups-List'
                // },
                {
                    name: 'navigation.Currency',
                    state: '/lookups-managment/currency/12',
                    type: 'link',
                    permissions: 'Lookups-List'
                },
                {
                    name: 'navigation.CustomerType',
                    state: '/lookups-managment/customerType/15',
                    type: 'link',
                    permissions: 'Lookups-List'
                },
                {
                    name: 'navigation.preferred-language',
                    state: '/lookups-managment/preferred-language/13',
                    type: 'link',
                    permissions: 'Lookups-List'
                },
                {
                    name: 'navigation.tax-management',
                    state: '/lookups-managment/tax-management/14',
                    type: 'link',
                    permissions: 'Lookups-List'
                },
                {
                    name: 'navigation.category',
                    state: '/lookups-managment/category/17',
                    type: 'link',
                    permissions: 'Lookups-List'
                },
                {
                    name: 'navigation.unitOfMeasure',
                    state: '/lookups-managment/unitOfMeasure/16',
                    type: 'link',
                    permissions: 'Lookups-List'
                },
                {
                    name: 'navigation.sectionType',
                    state: '/lookups-managment/sectionType/18',
                    type: 'link',
                    permissions: 'Lookups-List'
                },
                {
                    name: 'navigation.brand',
                    state: '/lookups-managment/brand/19',
                    type: 'link',
                    permissions: 'Lookups-List'
                }
            ]
        },
        {
            name: 'navigation.warehouse-management',
            type: 'dropDown',
            icon: 'i-Posterous',
            permissions: 'Product-List',
            sub: [
                {
                    name: 'navigation.warehouse',
                    state: '/product-management/warehouse',
                    type: 'link',
                    permissions: 'Warehouse-List',
                },
                {
                    name: 'warehouse-sections.warehouse-sections',
                    state: '/product-management/warehouse-sections',
                    type: 'link',
                    permissions: 'Warehouse-Sections-List',
                },
                {
                    name: 'navigation.warehouse-balance',
                    state: '/product-management/warehouse-balance',
                    type: 'link',
                    permissions: 'Product-List',
                },
                {
                    name: 'product-management.product',
                    state: '/product-management/products',
                    type: 'link',
                    permissions: 'Product-List',
                },
                {
                    name: 'navigation.transaction',
                    state: '/product-management/transaction',
                    type: 'link',
                    permissions: 'Transaction-list',
                },
                {
                    name: 'navigation.inventory-counting',
                    state: '/product-management/inventory-counting',
                    type: 'link',
                    permissions: 'Inventory-Counting',
                },
            ]
        },
        {
            name: 'navigation.invoice-management',
            type: 'dropDown',
            icon: 'i-File-Clipboard-File--Text',
            permissions: 'Invoice-Management',
            sub: [
                {
                    name: 'navigation.quotation',
                    state: '/invoice-management/quotation',
                    type: 'link',
                    permissions: 'Quotation-List',
                },
                {
                    name: 'navigation.quotation-convert',
                    state: '/invoice-management/quotation/convert',
                    type: 'link',
                    permissions: 'Convert-Quotation',
                },
                {
                    name: 'navigation.sales-invoices',
                    state: '/invoice-management/sales-invoice',
                    type: 'link',
                    permissions: 'Sales-Invoices-List',
                },
                {
                    name: 'navigation.pending-delivery-invoice',
                    state: '/invoice-management/sales-invoice/pending-delivery-invoices',
                    type: 'link',
                    permissions: 'Pending-Delivery-Invoices',
                },
                {
                    name: 'navigation.invoice-installment',
                    state: '/invoice-management/sales-invoice/installments',
                    type: 'link',
                    permissions: 'Installments',
                }
                
            ]
        },
        {
            name: 'navigation.purchase-management',
            type: 'dropDown',
            icon: 'i-File-Clipboard-File--Text',
            permissions: 'Purchase-Management',
            sub: [
                {
                    name: 'navigation.purchase-request-invoice',
                    state: '/purchase-management/purchase-request-invoice',
                    type: 'link',
                    permissions: 'Purchase-Request-List',
                },
                {
                    name: 'navigation.purchase-request-convert-invoice',
                    state: '/purchase-management/purchase-request-convert-invoice',
                    type: 'link',
                    permissions: 'Purchase-Convert',
                },
                {
                    name: 'navigation.purchase',
                    state: '/purchase-management/purchase-invoice',
                    type: 'link',
                    permissions: 'Purchase-Invoices-List',
                },
                {
                    name: 'navigation.purchase-delivery',
                    state: '/purchase-management/purchase-invoice/pending',
                    type: 'link',
                    permissions: 'Purchase-Delivery-Invoices',
                },
                {
                    name: 'navigation.purchase-installments',
                    state: '/purchase-management/purchase-invoice/installments',
                    type: 'link',
                    permissions: 'Purchase Installments',
                }
                
                
            ]
        },
        {
            name: 'navigation.reports',
            type: 'dropDown',
            icon: 'i-Newspaper',
            permissions: 'Reports',
            sub: [
                {
                    name: 'navigation.products-barcode',
                    state: '/report-management/productBarcodes',
                    type: 'link',
                    permissions: 'Product-Barcodes',
                },
                 {
                    name: 'navigation.sales-invoice-report',
                    state: '/report-management/sales-invoice-report',
                    type: 'link',
                    permissions: 'Invoices-Report',
                },
                {
                    name: 'navigation.sales-period-report',
                    state: '/report-management/sales-period-report',
                    type: 'link',
                    permissions: 'Invoices-Report',
                },
                {
                    name: 'navigation.sales-customer-report',
                    state: '/report-management/sales-customer-report',
                    type: 'link',
                    permissions: 'Invoices-Report',
                },
                {
                    name: 'navigation.sales-followup-report',
                    state: '/report-management/sales-installment-followup-report',
                    type: 'link',
                    permissions: 'Invoices-Report',
                },
                {
                    name: 'navigation.purchase-status-report',
                    state: '/report-management/purchase-status-report',
                    type: 'link',
                    permissions: 'Invoices-Report',
                },
                {
                    name: 'navigation.purchase-supplier-report',
                    state: '/report-management/purchase-supplier-report',
                    type: 'link',
                    permissions: 'Invoices-Report',
                },
                {
                    name: 'navigation.purchase-installment-followup-report',
                    state: '/report-management/purchase-installment-followup-report',
                    type: 'link',
                    permissions: 'Invoices-Report',
                },
                 {
                    name: 'navigation.purchase-period-report',
                    state: '/report-management/purchase-period-report',
                    type: 'link',
                    permissions: 'Invoices-Report',
                }


                
            ]
        }
    ];



    // sets iconMenu as default;
    menuItems = new BehaviorSubject<IMenuItem[]>(this.defaultMenu);
    // navigation component has subscribed to this Observable
    menuItems$ = this.menuItems.asObservable();

    // You can customize this method to supply different menu for
    // different user type.
    // publishNavigationChange(menuType: string) {
    //   switch (userType) {
    //     case 'admin':
    //       this.menuItems.next(this.adminMenu);
    //       break;
    //     case 'user':
    //       this.menuItems.next(this.userMenu);
    //       break;
    //     default:
    //       this.menuItems.next(this.defaultMenu);
    //   }
    // }
}
