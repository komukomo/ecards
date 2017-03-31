import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards: Card[];
  page = 1;

  constructor(private cardService: CardService) { }

  getCards() {
    this.cardService.getCards().then((cards) => {
      this.cards = cards;
      this.page = 0;
    });
  }

  nextPage() {
    this.cardService.getCards(false, this.page).then((cards) => {
      if (cards.length === 0) {
        return;
      }
      this.page++;
      this.cards = this.cards.concat(cards);
    });
  }

  ngOnInit() {
    this.getCards();
  }

  addCard(event: Event, fr: string, bk: string, frs: string, bks: string) {
    event.preventDefault();
    this.cardService.addCard(fr, bk, frs, bks).then(() => {
      this.getCards();
    });
  }

  discard() {
    this.getCards();
  }
}

