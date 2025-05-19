import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/utils/validation-email';

@Component({
	selector: 'app-addresses',
	templateUrl: './addresses.component.html'
})
export class AddressesComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder
	) { }

	addressAddForm!: FormGroup;
	isSubmittedAddressAddForm = false;

	addressEditForm!: FormGroup;
	isSubmittedAddressEditForm = false;

	ngOnInit() {
		this.addressAddForm = this.formBuilder.group({
			ContactName: [''],
			Email: ['', [Validators.required, emailValidator()]],
			Phone: ['', Validators.required],
			AddressType: ['', Validators.required],
			CountryCode: ['', Validators.required],
			CityCode: ['', Validators.required],
			AddressLine1: ['', Validators.required],
			AddressLine2: [''],
			ZipCode: [''],
			FaxNumber: [''],
			LocationCode1: [''],
			LocationCode2: [''],
			LocationCode3: [''],
			State: [''],
		}, { updateOn: 'blur' });

		this.addressEditForm = this.formBuilder.group({
			ContactName: [''],
			Email: ['', [Validators.required, emailValidator()]],
			Phone: ['', Validators.required],
			AddressType: ['', Validators.required],
			CountryCode: ['', Validators.required],
			CityCode: ['', Validators.required],
			AddressLine1: ['', Validators.required],
			AddressLine2: [''],
			ZipCode: [''],
			FaxNumber: [''],
			LocationCode1: [''],
			LocationCode2: [''],
			LocationCode3: [''],
			State: [''],
		}, { updateOn: 'blur' });
	}

	triggerDropRow(values: any): void {
		const target = values.target as HTMLInputElement;

		if (!target.closest('.dropdown')) {
			if (target.closest('.action-row.active')) {
				target.closest('.action-row').classList.remove('active');
			} else {
				target.closest('.action-row').classList.add('active');
			}
		}
	}

	handleCountrySelected(form, control, country) {		
		this[form].controls[control].patchValue(country.value.name);
	}

	handleModal(modal) {
		this.modalService.open(modal, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
	}

	@HostListener('document:keypress', ['$event'])

	onSubmit(event: KeyboardEvent) {  
	  const addressAdd = document.querySelector('#addressAddForm');  
	  const addressEdit = document.querySelector('#addressEditForm');  

	  if (event.key === 'Enter') {
		if (addressAdd) {
		  this.submitAddressAddForm();
		} else if (addressEdit) {
		  this.submitAddressEditForm()
		}
	  }
	}

	resetAddressAddForm(phoneInput, addCountry) {
		this.addressAddForm.reset();
		addCountry.value = {};
		this.addressAddForm.controls.Phone.patchValue(' ');
		phoneInput.preferredCountries = [];
    	phoneInput.ngOnInit();
        this.addressAddForm.controls.CountryCode.patchValue('');
		this.addressAddForm.controls.AddressType.patchValue('');
		this.addressAddForm.controls.State.patchValue('');
		this.addressAddForm.controls.CityCode.patchValue('');
	}

	submitAddressAddForm() {		
		console.log(this.addressAddForm.value);
		this.isSubmittedAddressAddForm = true;
	}

	resetAddressEditForm(phoneInput, editCountry) {
		this.addressEditForm.reset();
		editCountry.value = {};
		this.addressEditForm.controls.Phone.patchValue(' ');
		phoneInput.preferredCountries = [];
    	phoneInput.ngOnInit();
        this.addressEditForm.controls.CountryCode.patchValue('');
		this.addressEditForm.controls.AddressType.patchValue('');
		this.addressEditForm.controls.State.patchValue('');
		this.addressEditForm.controls.CityCode.patchValue('');
	}

	submitAddressEditForm() {
		console.log(this.addressEditForm.value);
		this.isSubmittedAddressEditForm = true;
	}
}