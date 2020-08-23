import { Injectable } from "@angular/core";
import { TokenService } from "../token/token.service";
import { Observable, BehaviorSubject } from "rxjs";
import * as jwtDecode from 'jwt-decode';

import { User } from "./user";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _userName: string;
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

    logout(): void {
        this._tokenService.removeToken();
        this._userSubject.next(null);
    }

    isLogged(): boolean {
        return this._tokenService.hasToken();
    }

    getUserName(): string {
        return this._userName;
    }

    private decodeAndNotify(): void {
        const token = this._tokenService.getToken();
        const user = jwtDecode(token) as User;
        this._userName = user.name;
        this._userSubject.next(user);
    }
}