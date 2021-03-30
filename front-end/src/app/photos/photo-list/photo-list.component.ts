import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[];
  filter = '';
  hasMore: boolean;
  currentPage: number;
  userName: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _photoService: PhotoService
  ) { 
    this.photos = [];
    this.filter = '';
    this.hasMore = true;
    this.currentPage = 1;
    this.userName = '';
  }
  
  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.userName = params.userName;
      this.photos = this._activatedRoute.snapshot.data.photos;
    });
  }

  load() {
    this._photoService.listFromUserPaginated(this.userName, ++this.currentPage)
    .subscribe(photos => {
      this.filter = '';
      this.photos = this.photos.concat(photos);
      if (!photos.length) {
        this.hasMore = false;
      }
    });
  }
}