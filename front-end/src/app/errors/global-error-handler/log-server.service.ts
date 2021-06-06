import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogServer } from './log-server';
import { environment } from '../../../environments/environment';

const API = environment.apiLogServer;

@Injectable({ providedIn: 'root' })
export class LogServerService {

    constructor(private _http: HttpClient) {
        //Ignore
    }

    log(logServer: LogServer): Observable<any> {
        return this._http.post(`${API}/infra/log`, logServer);
    }
}
