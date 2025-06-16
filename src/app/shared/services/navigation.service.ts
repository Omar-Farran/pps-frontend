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
            permissions: 'Dashboard',
            sub: [
                {
                    name: 'V1',
                    state: 'dashboard/v1',
                    type: 'link',
                    permissions: 'Dashboard'
                },
                {
                    name: 'V2',
                    state: '/dashboard/v2',
                    type: 'link',
                    permissions: 'Dashboard'
                },
                {
                    name: 'V3',
                    state: '/dashboard/v3',
                    type: 'link',
                    permissions: 'Dashboard'
                },
                {
                    name: 'V4',
                    state: '/dashboard/v4',
                    type: 'link',
                    permissions: 'Dashboard'
                },
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
            icon: 'i-Posterous',
            permissions: 'Invoice-Management',
            sub: [
                {
                    name: 'navigation.sales-invoices',
                    state: '/invoice-management/sales-invoice',
                    type: 'link',
                    permissions: 'Sales-Invoices-List',
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
