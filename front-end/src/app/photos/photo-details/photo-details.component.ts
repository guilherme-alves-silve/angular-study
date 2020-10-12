import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';

@Component({
    templateUrl: './photo-details.component.html',
    styleUrls: [ 'photo-details.css' ]
})
export class PhotoDetailsComponent implements OnInit {

    photoId: number;
    photo$: Observable<Photo>;

    constructor(
        private _route: ActivatedRoute,
        private _photoService: PhotoService
    ) { }
    
    ngOnInit(): void {
        this.photoId = this._route.snapshot.params.photoId;
        this.photo$ = this._photoService.findById(this.photoId);
    }
}