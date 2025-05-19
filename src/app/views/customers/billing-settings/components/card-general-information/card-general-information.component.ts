import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-card-general-information',
    templateUrl: './card-general-information.component.html',
    styleUrls: ['./card-general-information.component.scss']
})
export class CardGeneralInformationComponent implements OnInit {
    constructor(
        private modalService: NgbModal,
        private formBuilder: FormBuilder
    ) { }

    generalInfoForm!: FormGroup;
    isSubmittedGeneralInfoForm = false;
    
    ngOnInit(): void {
        this.generalInfoForm = this.formBuilder.group({
            GoodsLimit: [''],
            ChargeWeight: ['', Validators.required],
            WeightFactor: ['', Validators.required],
            MaxWeight: [''],
            MaxDimensions: [''],
        }, {updateOn: 'blur'});
    }

    handleModal(modal) {
        this.modalService.open(modal, { 
            modalDialogClass: 'side-modal side-modal-half', 
            backdrop : 'static',
            keyboard : false 
        });
    }

    @HostListener('document:keypress', ['$event'])

	onSubmit(event: KeyboardEvent) {  
        const generalInfoForm = document.querySelector('#generalInfoForm');  

        if (event.key === 'Enter' && generalInfoForm) {
            this.submitGeneralInfoForm();
        }
	}

    submitGeneralInfoForm() {
        this.isSubmittedGeneralInfoForm = true;
    }

    resetGeneralInfoForm() {
        this.generalInfoForm.reset();
    }
}
