import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Component({
    selector: 'ap-loading',
    templateUrl: './loading.component.html',
    styleUrls: [ 'loading.component.css' ]
})
export class LoadingComponent implements OnInit {

    loading$: Observable<string>;

    constructor(private _loadingService: LoadingService) {
        //Ignore
    }

    ngOnInit(): void {
        this.loading$ = this._loadingService
            .getLoading()
            .pipe(map(loadingType => loadingType.valueOf()));
    }
}