import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: UntypedFormGroup;
    constructor(
        private fb: UntypedFormBuilder,
        private auth: AuthService,
        private baseService : BaseService,
        private router: Router
    ) { }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
                this.loadingText = 'Loading Dashboard Module...';

                this.loading = true;
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });

        this.signinForm = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
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
    signin() {
        this.loading = true;
        this.loadingText = 'Sigining in...';
        this.baseService.Post('Auth','Login',this.signinForm.value)
            .subscribe(res => {
                this.auth.setToken((res as any).accessToken, (res as any).refreshToken)
                this.auth.authenticated = true
                this.getUserPermission()
                this.router.navigateByUrl('/dashboard/v1');
                this.loading = false;
            },error =>{
                console.log(error)
                this.loading = false;
            });
    }

    getUserPermission(){
        this.baseService.Get('Permissions','GetRolesPermissions').subscribe(res =>{
          this.auth.SetPermission(res as any[])
        })
      }

}
