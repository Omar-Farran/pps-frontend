import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
	isCompleted: boolean;
	data: any = {
		email: ''
	};

	constructor(
		private modalService: NgbModal,
		private fb: UntypedFormBuilder,
		private baseService:BaseService
	) { }

	ngOnInit() {
		this.getUser();
	}

	public User;
	getUser(){
		this.baseService.Get('Users','GetUserInfo').subscribe(res=>{
			this.User = res as any;
		})
	}

	triggerShowPass(e) {
		if (!e.target.classList.contains('show')) {
			e.target.classList.add('show');
			e.target.nextElementSibling.type = 'text';
		} else {
			e.target.classList.remove('show');
			e.target.nextElementSibling.type = 'password';
		}
	}

	onStep1Next(e) {
		let element: HTMLElement = document.getElementById('cur-pass-step') as HTMLElement;
    	element.innerHTML = '2';
	}
	onComplete(e) {
		let element: HTMLElement = document.getElementsByClassName('change-password-popup')[0] as HTMLElement;
    	element.click();
	}

	openChangePassword(content) {
		this.modalService.open(content, {
			windowClass: 'change-password-popup',
			ariaLabelledBy: 'modal-basic-title', 
			size: 'md',
			centered: true
		})
		.result.then((result) => {
			console.log(result);
		}, (reason) => {
			console.log('Err!', reason);
		});
	}
}