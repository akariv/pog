import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordComponent } from './record/record.component';
import { IntroComponent } from './intro/intro.component';
import { FacevideoComponent } from './facevideo/facevideo.component';
import { ThumbsComponent } from './thumbs/thumbs.component';
import { ThumbComponent } from './thumb/thumb.component';
import { PreparingComponent } from './preparing/preparing.component';
import { ProgressComponent } from './progress/progress.component';
import { CompleteComponent } from './complete/complete.component';

@NgModule({
  declarations: [
    AppComponent,
    RecordComponent,
    IntroComponent,
    FacevideoComponent,
    ThumbsComponent,
    ThumbComponent,
    PreparingComponent,
    ProgressComponent,
    CompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
