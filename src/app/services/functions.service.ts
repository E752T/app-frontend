import { Injectable } from '@angular/core';
import { DataService, today } from './data.service';
import { PostRequest } from './request.service';
import { baseURL } from '../enviroenment';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  constructor(private dataService: DataService) {}

  // Trovami l'ID di un oggetto dato in input il nome e l'array dove cercare
  findIdByName(
    array: any[],
    name: string,
    key:
      | 'authorID'
      | 'categoryID'
      | 'provenanceID'
      | 'shopkeeperID'
      | 'geographicalOriginID'
      | 'typeID'
      | 'warehouseID'
      | 'publisherID'
      | 'geographicalOriginID'
      | 'userID'
  ) {
    const foundObject = array.find((obj) => obj.name === name);
    return foundObject ? foundObject[key] : 1;
  }

  ///////////////////////////////////////////////////////////////////////
  // AUTORI
  public body_add_author = {
    authorID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
    email: '',
    telephone1: '',
    telephone2: '',
    notes: '',
  };

  public CreateAuthor(): Promise<any> {
    this.body_add_author.authorID = this.getNewIDAuthor(
      this.dataService.getAuthors()
    );

    this.dataService.addAuthor(this.body_add_author);

    // Esegui la richiesta Post
    return PostRequest(baseURL + 'AddAuthor/', this.body_add_author)
      .then((response) => {
        // Reset bodyAddAuthor a null dopo la PostRequest
        this.resetBodyAddAuthor();
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error;
      });
  }

  private resetBodyAddAuthor(): void {
    this.body_add_author = {
      authorID: 0,
      name: '',
      addedDate: today,
      lastUpdateDate: today,
      description: '',
      email: '',
      telephone1: '',
      telephone2: '',
      notes: '',
    };
  }

  private getNewIDAuthor(elementList: any[]): number {
    let highestID = 0;

    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].authorID > highestID) {
        highestID = elementList[i].authorID;
      }
    }

    return highestID + 1;
  }
}
