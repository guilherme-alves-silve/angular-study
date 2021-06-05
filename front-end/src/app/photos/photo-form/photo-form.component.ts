import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;
  percentDone = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private _photoService: PhotoService,
    private _router: Router,
    private _alertService: AlertService,
    private _userService: UserService
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
      .pipe(finalize(() => {
        this._router.navigate(['/user', this._userService.getUserName()]); 
      }))
      .subscribe((event: HttpEvent<any>) => {
        if (HttpEventType.UploadProgress == event.type) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (HttpEventType.Response == event.type) {
          this._alertService.success('Upload completed', true);
        }
      },
      error => {
        console.log(error);
        this._alertService.danger('Upload failed!', true);
      });
  }

  handleFile(file: File): void {
      this.file = file;
      const reader = new FileReader();
      reader.onload = (event: any) => this.preview = event.target.result;
      reader.readAsDataURL(file);
  }
}
