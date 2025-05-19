import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import {
	FormGroup,
	FormBuilder,
	Validators
  } from '@angular/forms';

@Component({
	selector: 'app-customers-management',
	templateUrl: './customers-management.component.html',
	styleUrls: ['./customers-management.component.css']
})
export class CustomersManagementComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private router: Router,
		private formBuilder: FormBuilder
	) { }

	editCustomerForm!: FormGroup;
	isSubmittedEditCustomer = false;

	ngOnInit() {
		this.editCustomerForm = this.formBuilder.group({
			CompanyCommercialName: ['', Validators.required],
			CompanyLegalName: ['', Validators.required],
			BusinessType: ['', Validators.required],
			Status: ['', Validators.required]
		})
	}

	filtersModal(filtersPopup) {
		this.modalService.open(filtersPopup, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
	}

	generalEditModal(generalEditPopup) {
		this.modalService.open(generalEditPopup, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
	}
	
	@HostListener('document:keypress', ['$event'])

	onSubmit(event: KeyboardEvent) {    
		const editCustomerForm = document.querySelector('#editCustomerForm');  
	
		if (event.key === 'Enter' && editCustomerForm) {
			this.submitEditCustomer();
		}
	}

	submitEditCustomer() {
		console.log(this.editCustomerForm.value);
		this.isSubmittedEditCustomer = true;
	}

	resetEditCustomer() {
		this.editCustomerForm.reset();
		this.editCustomerForm.controls.BusinessType.patchValue('');
        this.editCustomerForm.controls.Status.patchValue('');
	}

	redirect(event: Event) {
		const target = event.target as HTMLInputElement;
		
		if (!target.closest('.dropdown')) {
			this.router.navigateByUrl(target.closest('tr').dataset.link);
		}
	}
}