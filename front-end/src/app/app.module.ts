import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { PhotosModule } from './photos/photos.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ErrorsModule } from './errors/errors.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    PhotosModule,
    ErrorsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
