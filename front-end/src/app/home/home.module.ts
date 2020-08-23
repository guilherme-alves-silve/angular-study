import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule } from "@angular/router";

import { HomeComponent } from "./home.component";
import { SignInComponent } from "./signin/signin.component";
import { SignUpComponent } from "./signup/signup.component";
import { VMessageModule } from "../shared/vmessage/vmessage.module";
import { HomeRoutingModule } from "./home.routing.module";

@NgModule({
    declarations: [
        HomeComponent,
        SignInComponent,
        SignUpComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        VMessageModule,
        RouterModule,
        HomeRoutingModule
    ]
})
export class HomeModule {

}