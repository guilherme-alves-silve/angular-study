import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
           userName: ['', Validators.required],
           password: ['', Validators.required] 
        });
    }
}