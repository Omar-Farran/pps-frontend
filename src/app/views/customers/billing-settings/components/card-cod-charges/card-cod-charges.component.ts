import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-card-cod-charges',
    templateUrl: './card-cod-charges.component.html',
    styleUrls: ['./card-cod-charges.component.scss']
})
export class CardCodChargesComponent implements OnInit {
    constructor(
        private modalService: NgbModal,
        private formBuilder: FormBuilder
    ) { }

    codChangesForm!: FormGroup;
    isSubmittedCodChargesForm = false;

    ngOnInit(): void {
        this.codChangesForm = this.formBuilder.group({
            InvoicingFrequency: ['', Validators.required],
            InvoicingGroup: ['', Validators.required],
            RunAt: [''],
            CalculationTriggers: [''],
            InvoiceTriggers: [''],
            Status: ['', Validators.required],
        }, {updateOn: 'blur'});

        this.codChangesForm.get('InvoicingFrequency').valueChanges.subscribe(value => {
			if (value) {
			    this.codChangesForm.get('RunAt').setValidators([Validators.required]);
			} else {
			    this.codChangesForm.get('RunAt').clearValidators();
			}
	  
			this.codChangesForm.get('RunAt').updateValueAndValidity();
		});
    }

    handleModal(modal) {
        this.modalService.open(modal, { 
            modalDialogClass: 'side-modal side-modal-half', 
            backdrop : 'static',
            keyboard : false 
        });
    }

    updateRunAt() {
        this.codChangesForm.get('RunAt').setValue('');
    }

    onDateChange(event: any, control, form) {		
		this[form].controls[control].patchValue(event);
	}

    @HostListener('document:keypress', ['$event'])

	onSubmit(event: KeyboardEvent) {  
        const codChangesForm = document.querySelector('#codChangesForm');  

        if (event.key === 'Enter' && codChangesForm) {
            this.submitCodChargesForm();
        }
	}

    submitCodChargesForm() {
        this.isSubmittedCodChargesForm = true;
    }

    resetCodChargesForm() {
        this.codChangesForm.reset();
        this.codChangesForm.controls.InvoicingFrequency.patchValue('');
		this.codChangesForm.controls.InvoicingGroup.patchValue('');
        this.codChangesForm.controls.RunAt.patchValue('');
		this.codChangesForm.controls.CalculationTriggers.patchValue('');
		this.codChangesForm.controls.InvoiceTriggers.patchValue('');
		this.codChangesForm.controls.Status.patchValue('');
    }
}
