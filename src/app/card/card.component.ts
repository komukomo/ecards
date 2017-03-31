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

  editing = {
    f: false,
    b: false,
    fs: false,
    bs: false,
  };
  constructor(private cardService: CardService){ }

  ngOnInit() {
  }

  edit(key: string, val: boolean) {
    this.editing[key] = val;
    if (!val) {
      this.cardService.update(this.card);
    }
  }

  isEditing(key: string) {
    return this.editing[key];
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

