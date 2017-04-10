import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Card } from './card';

@Injectable()
export class CardService {
  private cardsUrl = 'http://localhost:3000/api/cards'; //TODO: external file
  private cardsUrlLearn = this.cardsUrl + '/learn';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getCards(toLearn: boolean = false, page: number = 0): Promise<Card[]> {
    const params = new URLSearchParams();
    params.set('p', String(page));
    if (toLearn) {
      params.set('learn', '1');
    }
    return this.http.get(this.cardsUrl, {search: params})
      .toPromise()
      .then(res => res.json() as Card[])
      .catch(this.handleError);
  }

  getCardsToLearn(): Promise<Card[]> {
    return this.getCards(true);
  }

  addCard(front: string, back: string, frontSup: string, backSup: string): Promise<Card> {
    return this.http.post(this.cardsUrl, {front, back, frontSup, backSup})
      .toPromise()
      .then(res => res.json() as Card)
      .catch(this.handleError);
  }

  deleteCard(card: Card): Promise<Card> {
    const url = `${this.cardsUrl}/${card.id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => card)
      .catch(this.handleError);
  }

  update(card: Card): Promise<any> {
    const url = `${this.cardsUrl}/${card.id}`;
    return this.http.put(url, JSON.stringify(card), {headers: this.headers})
      .toPromise()
      .then(() => card)
      .catch(this.handleError);
  }

  learn(updates: number[][]): Promise<any> {
    return this.http.patch(this.cardsUrlLearn, updates)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.messsage || error);
  }

}

