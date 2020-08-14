import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { Photo } from "./photo";

const API = 'http://localhost:3000';

@Injectable({
    providedIn: "root"
})
export class PhotoService {

    constructor(private _http: HttpClient) { }

    listFromUser(userName: string): Observable<Photo[]> {
        return this._http.get<Photo[]>(`${API}/${userName}/photos`);
    }
}