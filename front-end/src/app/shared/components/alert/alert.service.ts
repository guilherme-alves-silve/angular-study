import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Alert, AlertType } from './alert';

@Injectable({ providedIn: 'root' })
export class AlertService {

    private _alertSubject: Subject<Alert>;
    private _keepAfterRouteChange;

    constructor(router: Router) {
        this._alertSubject = new Subject<Alert>();
        this._keepAfterRouteChange = false;

        router.events.subscribe(event => {
            if (!(event instanceof NavigationStart)) {
                return;
            }

            if (this._keepAfterRouteChange) {
                this._keepAfterRouteChange = false;
                return;
            }

            this.clear();
        });
    }

    success(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
    }

    warning(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.WARNING, message, keepAfterRouteChange);
    }

    danger(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.DANGER, message, keepAfterRouteChange);
    }
    
    info(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.INFO, message, keepAfterRouteChange);
    }

    private alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean = false): void {
        this._keepAfterRouteChange = keepAfterRouteChange;
        this._alertSubject.next(new Alert(alertType, message));
    }

    private clear(): void {
        this._alertSubject.next(null);
    }

    getAlert() {
        return this._alertSubject.asObservable();
    }
}
