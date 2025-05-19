import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-billing-profiles',
  templateUrl: './card-billing-profiles.component.html',
  styleUrls: ['./card-billing-profiles.component.scss']
})
export class CardBillingProfilesComponent implements OnInit {
    constructor(
        private modalService: NgbModal,
        private formBuilder: FormBuilder
    ) { }

    addProfileForm!: FormGroup;
    isSubmittedAddProfileForm = false;

    ngOnInit(): void {
        this.addProfileForm = this.formBuilder.group({
            ProductService: ['', Validators.required],
            ProductType: ['', Validators.required],
            Ratesheet: ['', Validators.required],
            Discount: [''],
            StartDate: ['', Validators.required],
            EndDate: ['', Validators.required],
            ShipmentServices: [''],
            Surcharges: [''],
            Status: ['', Validators.required],
        }, {updateOn: 'blur'});
    }

    handleModal(modal) {
        this.modalService.open(modal, { 
            modalDialogClass: 'side-modal side-modal-half', 
            backdrop : 'static',
            keyboard : false 
        });
    }

    handleDeleteProfileModal(modal) {
		this.modalService.open(modal, {
			size: 'md', 
			centered: true
		});
	}

    handleErrorPopup(modal) {
        this.modalService.open(modal, { 
            windowClass: 'attachments-alert-popup',
            size: 'md', 
            centered: true 
        });
    }

    onDateChange(event: any, control, form) {		
		this[form].controls[control].patchValue(event);
	}

    @HostListener('document:keypress', ['$event'])

	onSubmit(event: KeyboardEvent) {   
        const addProfileForm = document.querySelector('#addProfileForm');  

        if (event.key === 'Enter' && addProfileForm) {
            this.submitAddProfileForm();
        }
	}
    submitAddProfileForm() {
        this.isSubmittedAddProfileForm = true;
    }

    resetAddProfileForm() {
        this.addProfileForm.reset();
        this.addProfileForm.controls.ProductService.patchValue('');
		this.addProfileForm.controls.ProductType.patchValue('');
        this.addProfileForm.controls.Ratesheet.patchValue('');
		this.addProfileForm.controls.Discount.patchValue('');
        this.addProfileForm.controls.ShipmentServices.patchValue('');
		this.addProfileForm.controls.Surcharges.patchValue('');
		this.addProfileForm.controls.Status.patchValue('');
    }
}
