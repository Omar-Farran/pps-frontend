import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BaseService } from "../../../shared/services/base.service";
import { LanguageService } from "../../../shared/services/language.service";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StatusArr } from "../../../shared/models/enum";
import {
  arabicTextWithNumbersValidator,
  englishTextWithNumbersValidator,
} from "src/app/utils/validation-text";
import { noWhitespaceValidator } from "src/app/utils/validation-white-space";

@Component({
  selector: "app-category-form",
  templateUrl: "./category-form.component.html",
  styleUrls: ["./category-form.component.scss"],
})
export class CategoryFormComponent implements OnInit {
  loading: boolean;

  title = "";
  Id;
  categoryForm = new FormGroup({
    id: new FormControl(0),
    code: new FormControl(""),
    nameEn: new FormControl("", [
      Validators.required,
      Validators.maxLength(100),
      englishTextWithNumbersValidator(),
    ]),
    nameAr: new FormControl("", [
      Validators.maxLength(100),
      arabicTextWithNumbersValidator(),
    ]),
    descriptionEn: new FormControl("", [
      englishTextWithNumbersValidator(),
      noWhitespaceValidator(),
    ]),
    descriptionAr: new FormControl("", [
      arabicTextWithNumbersValidator(),
      noWhitespaceValidator(),
    ]),
    status: new FormControl(1, [Validators.required]),
  });

  constructor(
    private toastr: ToastrService,
    private baseService: BaseService,
    private translate: TranslateService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.Id = params["id"];
      if (this.Id) {
        this.getCategory(this.Id);
      }
    });

    this.categoryForm.get('status')?.disable();

  }

  submit() {
    if (this.categoryForm.invalid) {
      Object.values(this.categoryForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    if (this.categoryForm.get("id").value > 0) {
      this.updateCategory();
    } else {
      this.addCategory();
    }


  }

  getCategory(id) {
    this.baseService.Get("Category", "Get/" + id).subscribe((res) => {
      this.categoryForm.patchValue(res);
    });
  }

  addCategory() {
    this.loading = true;
    const form: any = this.categoryForm.getRawValue();
    this.baseService.Post("Category", "Add", form).subscribe((res) => {
      this.loading = false;
      this.toastr.success(
        this.translate.instant("common.successOperation"),
        "Success!",
        { timeOut: 3000 }
      );
      this.router.navigate(["/production-products/category-list"]);
    });
  }

  updateCategory() {
    this.loading = true;
    const form: any = this.categoryForm.getRawValue();
    this.baseService.Post("Category", "Edit", form).subscribe((res) => {
      this.loading = false;
      this.toastr.success(
        this.translate.instant("common.successOperation"),
        "Success!",
        { timeOut: 3000 }
      );
      this.router.navigate(["/production-products/category-list"]);
    });
  }
}
