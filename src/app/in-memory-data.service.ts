import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Card } from './card';

export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const cards: Card[] = [];
    for (let i = 1; i <= 20; i++) {
      cards.push({
        id: i,
        front: `front${i}`,
        frontSup: `supplementary information of the front${i} message`,
        back: `back${i}`,
        backSup: `supplementary information of the back${i} message`,
        level: i,
        learntime: new Date(),
      });
    }
    return {cards};
  }
}
