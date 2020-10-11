import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { PhotoComment } from '../photo/photo-comment';

@Component({
    templateUrl: './photo-details.component.html',
    styleUrls: [ 'photo-details.css' ]
})
export class PhotoDetailsComponent implements OnInit {

    photo$: Observable<Photo>;
    comments$: Observable<PhotoComment[]>;

    constructor(
        private _route: ActivatedRoute,
        private _photoService: PhotoService
    ) { }
    
    ngOnInit(): void {
        const id = this._route.snapshot.params.photoId;
        this.photo$ = this._photoService.findById(id);
        this.comments$ = this._photoService.getComments(id);
    }
}