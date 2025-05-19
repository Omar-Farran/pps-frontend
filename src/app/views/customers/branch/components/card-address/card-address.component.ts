import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { emailValidator } from 'src/app/utils/validation-email';

@Component({
    selector: 'app-card-address',
    templateUrl: './card-address.component.html',
    styleUrls: ['./card-address.component.scss']
})
export class CardAddressComponent implements OnInit {
    constructor(
        private modalService: NgbModal,
        private formBuilder: FormBuilder
    ) { }

    @Input() dataCustomerAddress;

    addressAddForm!: FormGroup;
    isSubmittedAddressAddForm = false;
    invalidAddEmail = false;

    addressEditForm!: FormGroup;
    isSubmittedAddressEditForm = false;
    invalidEditEmail = false;

    ngOnInit(): void {
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
        }, {updateOn: 'blur'});

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
        }, {updateOn: 'blur'});
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

    handleCountrySelected(form, control, country) {		
		this[form].controls[control].patchValue(country.value.name);
	}

    resetAddressAddForm(phoneInput, addCountry) {
        this.addressAddForm.reset();
        addCountry.value = {};
        this.addressAddForm.controls.Phone.patchValue(' ');
        phoneInput.preferredCountries = [];
        phoneInput.ngOnInit();
        this.addressAddForm.controls.CountryCode.patchValue('');
        this.addressAddForm.controls.AddressType.patchValue('');
        this.addressAddForm.controls.CityCode.patchValue('');
        this.addressAddForm.controls.State.patchValue('');
    }

    submitAddressAddForm() {
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
        this.addressEditForm.controls.CityCode.patchValue('');
        this.addressEditForm.controls.State.patchValue('');
    }

    submitAddressEditForm() {
        this.isSubmittedAddressEditForm = true;
    }
}
