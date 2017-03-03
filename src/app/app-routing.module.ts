import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardsComponent }   from './cards/cards.component';
import { LearningComponent }   from './learning/learning.component';

const routes: Routes = [
  { path: '', redirectTo: '/learning', pathMatch: 'full' },
  { path: 'learning', component: LearningComponent },
  { path: 'cards', component: CardsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

