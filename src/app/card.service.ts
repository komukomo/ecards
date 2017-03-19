import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Card } from './card';

import { environment } from 'environments/environment';

@Injectable()
export class CardService {
  private cardsUrl = 'api/cards';

  constructor(private http: Http) { }

  getCards(toLearn: boolean = false): Promise<Card[]> {
    const params = new URLSearchParams();
    if (toLearn && environment.production) {
      params.set('learn', '1');
    }
    return this.http.get(this.cardsUrl, {search: params})
      .toPromise()
      .then(res => res.json().data as Card[])
      .catch(this.handleError);
  }

  getCardsToLearn(): Promise<Card[]> {
    return this.getCards(true);
  }

  addCard(front: string, back: string): Promise<Card> {
    return this.http.post(this.cardsUrl, {front, back})
      .toPromise()
      .then(res => res.json().data as Card)
      .catch(this.handleError);
  }

  update(cards: Card[]): Promise<any> {
    return Promise.resolve();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.messsage || error);
  }

}
