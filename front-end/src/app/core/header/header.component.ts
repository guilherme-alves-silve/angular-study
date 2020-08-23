import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { UserService } from "../user/user.service";
import { User } from "../user/user";

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    user$: Observable<User>;

    constructor(
        private _userService: UserService,
        private _router: Router
    ) {
        this.user$ = _userService.getUser();
    }

    logout(): void {
        this._userService.logout();
        this._router.navigate(['']);
    }
}