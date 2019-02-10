import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordComponent } from './record/record.component';
import { IntroComponent } from './intro/intro.component';

const routes: Routes = [
  {path: '', component: RecordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
