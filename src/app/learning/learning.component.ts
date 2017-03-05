import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {
  cards: Card[];
  rates: number[];
  index = 0;

  constructor(private cardService: CardService) { }

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

}
