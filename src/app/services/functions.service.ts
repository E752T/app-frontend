import { EventEmitter, Injectable } from '@angular/core';
import { baseURL } from '../services/data.service';

import {
  DatabaseObject,
  Author,
  Category,
  Warehouse,
  Publisher,
  Provenance,
  GeographicalOrigin,
  TypeObject,
  Shopkeeper,
} from './interfaces.service';
import { PostRequest } from './request.service';

export class FunctionLibrary {
  constructor() {}

  /**
   * Restituisce un nuovo ID incrementato rispetto all'ID più alto presente nella lista di elementi.
   * @param elementList Lista degli elementi
   * @param idKey Chiave per recuperare l'ID da ciascun elemento
   * @returns Il nuovo ID incrementato di 1 rispetto all'ID più alto trovato
   *
   *  ESEMPIO di utilizzo
   *  const newAuthorID = getNewID(authors, 'authorID');
   */

  getNewID<T>(elementList: Array<T>, idKey: keyof T): number {
    let highestID = 0; // Inizializza l'ID più alto a 0c

    // Scansiona la lista di elementi
    for (let i = 0; i < elementList.length; i++) {
      // Confronta l'ID dell'elemento corrente con l'ID più alto trovato finora
      if ((elementList[i][idKey] as unknown as number) > highestID) {
        highestID = elementList[i][idKey] as unknown as number; // Aggiorna l'ID più alto se necessario
      }
    }

    return highestID + 1; // Restituisce un nuovo ID incrementato di 1 rispetto all'ID più alto trovato
  }



}
