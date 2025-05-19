import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
	FormGroup,
	FormBuilder,
	Validators
} from '@angular/forms';

@Component({
	selector: 'app-sla',
	templateUrl: './sla.component.html',
	styleUrls: ['./sla.component.css']
})
export class SlaComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder
	) { }

	slaAddForm!: FormGroup;
	isSubmittedSlaAddForm = false;

	slaEditForm!: FormGroup;
	isSubmittedSlaEditForm = false;

	ngOnInit() {
		this.slaAddForm = this.formBuilder.group({
			Sla: ['', Validators.required],
			PreferredContactLanguage: ['', Validators.required],
			CivilIdVerification: [null, Validators.required],
			HardCopyContract: [null],
			SignedRunsheet: [null],
			LargeLoads: [null],
			CriticalMaterial: [null],
			DocumentReturn: [null],
		}, { updateOn: 'blur' });

		this.slaEditForm = this.formBuilder.group({
			Sla: ['', Validators.required],
			PreferredContactLanguage: ['', Validators.required],
			CivilIdVerification: [null, Validators.required],
			HardCopyContract: [null],
			SignedRunsheet: [null],
			LargeLoads: [null],
			CriticalMaterial: [null],
			DocumentReturn: [null],
		}, { updateOn: 'blur' });
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
	  const slaAdd = document.querySelector('#slaAddForm');  
	  const slaEdit = document.querySelector('#slaEditForm');  
  
	  if (event.key === 'Enter') {
		if (slaAdd) {
		  this.submitSlaAddForm();
		} else if (slaEdit) {
		  this.submitSlaEditForm();
		}
	  }
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

	submitSlaAddForm() {
		console.log(this.slaAddForm.value);
		this.isSubmittedSlaAddForm = true;
	}

	resetSlaAddForm() {
		this.slaAddForm.reset();
		this.slaAddForm.controls.Sla.patchValue('');
        this.slaAddForm.controls.PreferredContactLanguage.patchValue('');
	}

	submitSlaEditForm() {
		console.log(this.slaEditForm.value);
		this.isSubmittedSlaEditForm = true;
	}

	resetSlaEditForm() {
		this.slaEditForm.reset();
		this.slaEditForm.controls.Sla.patchValue('');
        this.slaEditForm.controls.PreferredContactLanguage.patchValue('');
	}
}