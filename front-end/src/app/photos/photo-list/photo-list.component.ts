import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: Photo[];
  filter = '';
  debounce: Subject<string>;
  hasMore: boolean;
  currentPage: number;
  userName: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _photoService: PhotoService
  ) { 
    this.photos = [];
    this.filter = '';
    this.debounce = new Subject<string>();
    this.hasMore = true;
    this.currentPage = 1;
    this.userName = '';
  }
  
  ngOnInit(): void {
    this.userName = this._activatedRoute.snapshot.params.userName;
    this.photos = this._activatedRoute.snapshot.data.photos;
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.filter = filter);
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  load() {
    this._photoService.listFromUserPaginated(this.userName, ++this.currentPage)
    .subscribe(photos => {
      this.photos = this.photos.concat(photos);
      if (!photos.length) {
        this.hasMore = false;
      }
    });
  }
}