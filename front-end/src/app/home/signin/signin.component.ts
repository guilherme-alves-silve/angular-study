import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from "@angular/router";

import { AuthService } from "../../core/auth/auth.service";
import { PlatformDetectorService } from "../../core/platform-detector/platform-detector.service";

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _router: Router,
        private _platformDetectorService: PlatformDetectorService
    ) { }

    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
           userName: ['', Validators.required],
           password: ['', Validators.required] 
        });
        this.focusInUserNameField();
    }

    login(): void {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;
        this._authService.authenticate(userName, password)
        .subscribe(() => {
            this._router.navigate(['user', userName ]);
            console.log('autenticado!');
        }, error => {
            console.log(error);
            this.loginForm.reset();
            this.focusInUserNameField();
            alert('Invalid user name or password');
        });
    }

    private focusInUserNameField(): void {
        this._platformDetectorService.isPlatformBrowser() && 
            this.userNameInput.nativeElement.focus();
    }
}