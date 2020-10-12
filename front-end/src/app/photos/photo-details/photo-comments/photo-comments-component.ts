import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.html'
})
export class PhotoCommentsComponenet implements OnInit {

    @Input() photoId: number;

    comments$: Observable<PhotoComment[]>;

    constructor(private _photoService: PhotoService) { }

    ngOnInit(): void {
        this.comments$ = this._photoService.getComments(this.photoId);
    }
}