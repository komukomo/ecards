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

  nextPage() {
    this.cardService.getCards(false, this.page).then((cards) => {
      if (cards.length === 0) {
        return;
      }
      this.page++;
      this.cards = this.cards.concat(cards);
      this.editingF = this.editingF.concat(Array(this.cards.length).fill(false));
      this.editingB = this.editingB.concat(Array(this.cards.length).fill(false));
    });
  }

  ngOnInit() {
    this.getCards();
  }

  editStyle(i: number, isFront: boolean = true): boolean {
    return isFront ? this.editingF[i] : this.editingB[i];
  }

  editCard(i: number, isFront: boolean = true) {
    isFront ?
      this.editingF[i] = true :
      this.editingB[i] = true;
  }

  finEdit(i: number, isFront: boolean = true) {
    isFront ?
      this.editingF[i] = false :
      this.editingB[i] = false;
    this.cardService.update(this.cards[i]);
  }

  addCard(event: Event, fr: string, bk: string) {
    event.preventDefault();
    this.cardService.addCard(fr, bk).then(() => {
      this.getCards();
    });
  }

  deleteCard(id: number, fr: string) {
    if (!confirm(`Delete this card ? "${fr}"`)) {
      return;
    }
    this.cardService.deleteCard(id).then(() => {
      this.getCards();
    });
  }

}
