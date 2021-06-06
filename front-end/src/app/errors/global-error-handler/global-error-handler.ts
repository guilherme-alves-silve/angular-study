import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import { UserService } from 'src/app/core/user/user.service';
import { LogServerService } from './log-server.service';
import { LogServer } from './log-server';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private _injector: Injector) {

    }

    handleError(error: any): void {

        console.log('An error has ocurred!');

        const location = this._injector.get(LocationStrategy);
        const userService = this._injector.get(UserService);
        const logServerService = this._injector.get(LogServerService);
        const router = this._injector.get(Router);

        const url = location instanceof PathLocationStrategy 
            ? location.path()
            : '';

        const message = error.message 
            ? error.message
            : error.toString();

        if (environment.production) {
            router.navigate(['/error']);
        }
        
        StackTrace
            .fromError(error)
            .then(stackFrame => {
                const stackAsString = stackFrame
                    .map(frame => frame.toString())
                    .join('\n');

                const logServer: LogServer = { 
                    message, 
                    url, 
                    userName: userService.getUserName(), 
                    stack: stackAsString 
                };

                console.log(logServer);
                logServerService
                    .log(logServer)
                    .subscribe(
                        () => {
                            console.log('Error logged on server!')
                        },
                        error => {
                            console.log(error);
                            console.log('Failed to send error log to log-server!');
                        }
                    );
            });
    }
}
