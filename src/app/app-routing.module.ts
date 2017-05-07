import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardsComponent } from './cards/cards.component';
import { LearningComponent } from './learning/learning.component';
import { UploaderComponent } from './uploader/uploader.component';

const routes: Routes = [
  { path: '', redirectTo: '/learning', pathMatch: 'full' },
  { path: 'learning', component: LearningComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'uploader', component: UploaderComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

