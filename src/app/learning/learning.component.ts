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
  index = 0;

  constructor(private cardService: CardService) { }

  getCards() {
    this.cardService.getCards().then(
      cards => this.cards = cards
    );
  }

  ngOnInit() {
    this.getCards();
  }

  changeIndex(i: number) {
    this.index = (i) % this.cards.length;
  }

  next() {
    changeIndex(this.index + 1);
  }

  prev() {
    changeIndex(this.index - 1);
  }

}
