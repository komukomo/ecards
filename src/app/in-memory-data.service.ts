import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Card } from './card';

export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const cards: Card[] = [];
    for (let i = 0; i < 20; i++) {
      cards.push({
        id: i,
        front: `front${i}`,
        back: `back${i}`,
        level: i,
        learntime: new Date(),
      });
    }
    return {cards};
  }
}
