import { Injectable } from "@angular/core";
import { TokenService } from "../token/token.service";
import { Observable, BehaviorSubject } from "rxjs";
import * as jwtDecode from 'jwt-decode';

import { User } from "./user";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _userSubject: BehaviorSubject<User>;

    constructor(private _tokenService: TokenService) {
        this._userSubject = new BehaviorSubject(null);
        this._tokenService.hasToken() && 
            this.decodeAndNotify();
    }

    setToken(token: string): void {
        this._tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser(): Observable<User> {
        return this._userSubject.asObservable();
    }

    private decodeAndNotify(): void {
        const token = this._tokenService.getToken();
        const user = jwtDecode(token) as User;
        this._userSubject.next(user);
    }
}