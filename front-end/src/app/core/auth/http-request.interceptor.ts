import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "../token/token.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private _tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (this._tokenService.hasToken()) {
            const token = this._tokenService.getToken();
            req = req.clone({
                setHeaders: {
                    'x-access-token': token
                }
            });
        }

        return next.handle(req);
    }

}