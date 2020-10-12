import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoModule } from '../photo/photo.module';
import { PhotoCommentsComponenet } from './photo-comments/photo-comments-component';
import { RouterModule } from '@angular/router';

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
        RouterModule
    ]
})
export class PhotoDetailsModule {

}