import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Card } from './card';

import { environment } from 'environments/environment';

@Injectable()
export class CardService {
  private cardsUrl = 'api/cards';
  private cardsUrlLearn = this.cardsUrl + '/learn';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getCards(toLearn: boolean = false, page: number = 0): Promise<Card[]> {
    const params = new URLSearchParams();
    if (toLearn && environment.production) {
      params.set('learn', '1');
    }
    params.set('p', String(page));
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

  deleteCard(id: number): Promise<Card> {
    const url = `${this.cardsUrl}/${id}`;
    return this.http.delete(url)
      .toPromise()
      .then()
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
    if (!environment.production) {
      return Promise.resolve();
    }
    return this.http.put(this.cardsUrlLearn, updates)
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.messsage || error);
  }

}

