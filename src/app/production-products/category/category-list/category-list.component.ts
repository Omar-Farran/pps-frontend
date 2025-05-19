import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from '../../../shared/services/base.service';
import { LanguageService } from '../../../shared/services/language.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

    columns: any[] =
        [
            { name: 'category.code', field: 'code', },
            { name: 'category.nameEn', field: 'nameEn' },
            { name: 'category.nameAr', field: 'nameAr' },
            { name: 'category.descriptionEn', field: 'descriptionEn' },
            { name: 'category.descriptionAr', field: 'descriptionAr' },
            { name: 'category.status', field: 'status' },
        ]

    dataSource: any[] = []

    actionList: any[] =
        [
            { name: 'common.edit', icon: 'edit', permission: 'Update-Category' },
            { name: 'common.changeStatus', icon: 'change' , permission: 'Update-Category' },
        ]

    baseSearch =
        {
            pageSize: 25,
            PageNumber: 0,
            name: null,
        }

    totalCount: number = 0

    constructor
        (
            private toastr: ToastrService,
            private translate: TranslateService,
            private baseService: BaseService,
            private modalService: NgbModal,
            private languageService: LanguageService,
            private router: Router,
            public authService: AuthService
        ) { }

    getCategories() {
        this.baseService.Post('Category', 'List', this.baseSearch).subscribe(res => {
            this.dataSource = (res as any).entities;
            this.totalCount = (res as any).totalCount;
        })
    }

    ngOnInit(): void {
        this.getCategories()
    }

    onSearch(event) {
        this.baseSearch.name = event.target.value;
        this.baseSearch.PageNumber = 0;
        this.getCategories();
    }

    onPageChange(event) {
        this.baseSearch.PageNumber = event.PageIndex - 1;
        this.baseSearch.pageSize = event.pageSize;
        this.getCategories();
    }

    onHandleAction(event) {
        switch (event.action.name) {
            case 'common.edit': { this.onEditCategory(event.data) } break;
            case 'common.changeStatus': { this.onUpdateStatus(event.data) } break;
        }
    }

    onAddCategory() {
        this.router.navigate(['/production-products/category-form'])
    }

    onEditCategory(event) {
        this.router.navigate(['/production-products/category-form'], { queryParams: { id: event.id } })
    }

    onUpdateStatus(event) {
        this.baseService.UpdateStatus('Category', 'UpdateStatus/' + event.id).subscribe(res => {
            this.toastr.success(this.translate.instant('common.successOperation'), 'Success!', { timeOut: 3000 });
            this.getCategories();
        })
    }

}
