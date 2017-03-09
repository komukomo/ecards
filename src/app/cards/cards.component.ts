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
  editingF: boolean[];
  editingB: boolean[];

  constructor(private cardService: CardService) { }

  getCards() {
    this.cardService.getCards().then((cards) => {
      this.cards = cards;
      this.editingF = Array(this.cards.length).fill(false);
      this.editingB = Array(this.cards.length).fill(false);
    });
  }

  ngOnInit() {
    this.getCards();
  }

  editStyle(i: number, isFront: boolean = true): boolean {
    return isFront ? this.editingF[i]: this.editingB[i];
  }

  editCard(i: number, isFront: boolean = true) {
    isFront ?
      this.editingF[i] = true:
      this.editingB[i] = true;
  }

  finEdit(i: number, isFront: boolean = true) {
    isFront ?
      this.editingF[i] = false:
      this.editingB[i] = false;
  }

}
