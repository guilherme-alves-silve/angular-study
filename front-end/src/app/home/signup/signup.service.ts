import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

import { NewUser } from "./new-user";
import { environment } from '../../../environments/environment'

const API = environment.apiUrl;

@Injectable()
export class SignUpService {

    constructor(private _http: HttpClient) { }

    checkUserNameTaken(userName: string): Observable<Object> {
        return this._http.get(`${API}/user/exists/${userName}`);
    }

    signup(newUser: NewUser) {
        return this._http.post(`${API}/user/signup`, newUser);
    }
}