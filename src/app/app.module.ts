import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { LearningComponent } from './learning/learning.component';

import { CardService } from './card.service';
import { WindowService } from './window.service';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    LearningComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [
    CardService,
    WindowService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
