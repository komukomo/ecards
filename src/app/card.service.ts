import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Card } from './card';

@Injectable()
export class CardService {
  private cardsUrl = 'api/cards';

  constructor(private http: Http) { }

  getCards(): Promise<Card[]> {
    return this.http.get(this.cardsUrl)
      .toPromise()
      .then(res => res.json().data as Card[])
      .catch(this.handleError);
  }

  getCardsToLearn(): Promise<Card[]> {
    const params = new URLSearchParams();
    params.set('learn', '1');
    return this.http.get(this.cardsUrl, {search: params})
      .toPromise()
      .then(res => res.json().data as Card[])
      .catch(this.handleError);
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
