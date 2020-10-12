import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoModule } from '../photo/photo.module';
import { PhotoCommentsComponenet } from './photo-comments/photo-comments-component';
import { VMessageModule } from 'src/app/shared/vmessage/vmessage.module';

@NgModule({
    declarations: [ 
        PhotoDetailsComponent,
         PhotoCommentsComponenet
    ],
    exports: [ 
        PhotoDetailsComponent, 
        PhotoCommentsComponenet 
    ],
    imports: [
        CommonModule,
        PhotoModule,
        RouterModule, 
        ReactiveFormsModule,
        VMessageModule
    ]
})
export class PhotoDetailsModule {

}