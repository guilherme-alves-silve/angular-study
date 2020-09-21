import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _photoService: PhotoService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.photoForm = this._formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
  }
                  
  upload(): void {
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    this._photoService
      .upload(description, allowComments, this.file)
      .subscribe(() => this._router.navigate(['']));
  }

  handleFile(file: File): void {
      this.file = file;
      const reader = new FileReader();
      reader.onload = (event: any) => this.preview = event.target.result;
      reader.readAsDataURL(file);
  }
}
