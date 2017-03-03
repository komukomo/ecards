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

  constructor(private cardService: CardService) { }

  getCards() {
    this.cardService.getCards().then(
      cards => this.cards = cards
    );
  }

  ngOnInit() {
    this.getCards();
  }

}
