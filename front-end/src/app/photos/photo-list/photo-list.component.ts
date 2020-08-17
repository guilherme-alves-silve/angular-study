import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter = '';

  constructor(
    private _photoService: PhotoService,
    private _activatedRoute: ActivatedRoute
  ) { }
  
  ngOnInit(): void {

    const userName = this._activatedRoute.snapshot.params.userName;
    this._photoService
      .listFromUser(userName)
      .subscribe(
        photos => this.photos = photos,
        error => console.log(error.message)
      ); 
  }
}