import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];

  constructor(private _photoService: PhotoService) { }
  
  ngOnInit(): void {
    this._photoService
      .listFromUser("flavio")
      .subscribe(
        photos => this.photos = photos,
        error => console.log(error.message)
      ); 
  }
}