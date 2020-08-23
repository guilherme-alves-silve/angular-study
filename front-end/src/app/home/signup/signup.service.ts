import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

import { NewUser } from "./new-user";

const API_URL = "http://localhost:3000";

@Injectable({
    providedIn: 'root'
})
export class SignUpService {

    constructor(private _http: HttpClient) { }

    checkUserNameTaken(userName: string): Observable<Object> {
        return this._http.get(`${API_URL}/user/exists/${userName}`);
    }

    signup(newUser: NewUser) {
        return this._http.post(`${API_URL}/user/signup`, newUser);
    }
}