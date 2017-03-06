import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';
import { WindowService } from '../window.service';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {
  cards: Card[];
  rates: number[];
  index = 0;
  _window;

  constructor(
    private windowRef: WindowService,
    private cardService: CardService
  ) {
    this._window = windowRef.nativeWindow;
  }

  getCards() {
    this.cardService.getCards().then((cards) => {
        this.cards = cards;
        this.rates = Array(this.cards.length).fill(NaN);
      }
    );
  }

  ngOnInit() {
    this.getCards();
  }

  changeIndex(i: number) {
    this.index = (i) % this.cards.length;
  }

  next() {
    this.changeIndex(this.index + 1);
  }

  prev() {
    this.changeIndex(this.index - 1);
  }

  rate(val: number) {
    this.rates[this.index] = val;
  }

  play(text: string) {
    const msg = new this._window.SpeechSynthesisUtterance(text);
    msg.lang = 'en-US';
    this._window.speechSynthesis.speak(msg);
  }

}
