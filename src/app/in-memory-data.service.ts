import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CARDS } from './mock-cards';

export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let cards = CARDS;
    return {cards};
  }
}
