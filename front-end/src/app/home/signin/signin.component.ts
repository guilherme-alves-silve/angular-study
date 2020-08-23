import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from "@angular/router";

import { AuthService } from "../../core/auth.service";

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    loginForm: FormGroup;

    constructor(
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
           userName: ['', Validators.required],
           password: ['', Validators.required] 
        });
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
        });
    }
}