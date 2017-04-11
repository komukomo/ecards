import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardService } from '../card.service';
import { Card } from '../card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  card: Card;
  @Output('discard')
  discardEvent = new EventEmitter<number>();

  constructor(private cardService: CardService){ }

  ngOnInit() {
  }

  update() {
    this.cardService.update(this.card);
  }

  discard() {
    if (!confirm(`Delete this card ? "${this.card.front}"`)) {
      return;
    }
    this.cardService.deleteCard(this.card).then(() => {
      this.discardEvent.emit(this.card.id);
    });
  }
}

