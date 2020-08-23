import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { lowerCaseValidator } from "../../shared/validators/lower-case.validator";
import { UserNotTakenValidatorService } from "./user-not-taken.validator.service";
import { SignUpService } from "./signup.service";
import { NewUser } from "./new-user";
import { PlatformDetectorService } from "../../core/platform-detector/platform-detector.service";

@Component({
    templateUrl: './signup.component.html',
    providers: [
        UserNotTakenValidatorService
    ]
})
export class SignUpComponent implements OnInit {

    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private _formBuilder: FormBuilder,
        private _signUpService: SignUpService,
        private _userNotTakenValidatorService: UserNotTakenValidatorService,
        private _platformDetectorService: PlatformDetectorService,
        private _router: Router
    ) { }

    signup() {
        const newUser = this.signupForm.getRawValue() as NewUser;
        this._signUpService.signup(newUser)   
            .subscribe(
                () => this._router.navigate(['']),
                error => {
                    this.focusInEmailField();
                    console.log(error);
                }
            );
    }

    ngOnInit(): void {
        this.signupForm = this._formBuilder.group({
            email: ['', 
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: ['', 
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: ['', 
                [
                    Validators.required,
                    lowerCaseValidator,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                this._userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: ['', 
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]        
            ]
        });

        this.focusInEmailField();
    }

    private focusInEmailField(): void {
        this._platformDetectorService.isPlatformBrowser() && 
            this.emailInput.nativeElement.focus();
    }
}