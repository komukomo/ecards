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
  visible: boolean[];
  index = 0;

  constructor(private cardService: CardService) {}

  get finished(): boolean {
    return this.rates && !this.rates.some(isNaN);
  }

  getCards() {
    this.cardService.getCardsToLearn().then((cards) => {
        this.cards = cards;
        this.rates = Array(this.cards.length).fill(NaN);
        this.visible = Array(this.cards.length).fill(false);
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

  reveal(i: number) {
    this.visible[i] = true;
  }

  finish() {
    this.cards.forEach((card, i) => {
      const level = card.level + this.rates[i];
      card.level = Math.max(0, level);
    });
    this.cardService.update(this.cards).then(() => {
      this.getCards();
    });
  }

}
