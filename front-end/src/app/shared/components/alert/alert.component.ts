import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from './alert.service';
import { Alert, AlertType } from './alert';

@Component({
    selector: 'ap-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {

    @Input() timeout = 3000;
    alerts: Alert[] = [];

    constructor(private _alertService: AlertService) {

    }

    ngOnInit(): void {
        this._alertService
        .getAlert()
        .subscribe(alert => {
            if (!alert) {
                this.alerts = [];
                return;
            }

            this.alerts.push(alert);
            setTimeout(() => this.removeAlert(alert), this.timeout);
        });
    }

    getAlertClass(alert: Alert) {
        if (!alert) {
            return '';
        }

        switch (alert.alertType) {
            case AlertType.DANGER:
                return 'alert alert-danger';
            case AlertType.WARNING:
                return 'alert alert-warning';
            case AlertType.INFO:
                return 'alert alert-info';
            case AlertType.SUCCESS:
                return 'alert alert-success';
            default:
                return '';
        }
    }

    private removeAlert(alertToRemove: Alert) {
        this.alerts = this.alerts.filter(alert => alert !== alertToRemove);
    }
}