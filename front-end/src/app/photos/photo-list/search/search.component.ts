import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

    @Input() value: string;
    @Output() onTyping: EventEmitter<string>;
    debounce: Subject<string>;

    constructor() {
        this.value = '';
        this.onTyping = new EventEmitter();
        this.debounce = new Subject();
    }

    ngOnInit(): void {
        this.debounce
        .pipe(debounceTime(300))
        .subscribe(filter => this.onTyping.emit(filter));
    }

    ngOnDestroy(): void {
        this.debounce.unsubscribe();
    }
}