import { Injectable } from '@angular/core';
import { DataService, today } from './data.service';
import { PostRequest } from './request.service';
import { baseURL } from '../enviroenment';

@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  constructor(private dataService: DataService) {}

  /////////////////////////////////////////////////////////////////////////
  // FUNZIONI GENERALI ////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  findIdByName(
    // Trovami l'ID di un oggetto dato in input il nome e l'array dove cercare
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
    return foundObject ? foundObject[key] : null;
  }

  private getNewID(
    elementList: any[],
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
  ): number {
    let highestID = 0;

    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i][key] > highestID) {
        highestID = elementList[i][key];
      }
    }

    return highestID + 1;
  }

  /////////////////////////////////////////////////////////////////////////
  // AUTORI  //////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  public CreateAuthor(): Promise<any> {
    this.dataService.body_add_author.authorID = this.getNewID(
      this.dataService.getAuthors(),
      'authorID'
    );

    this.dataService.addAuthor(this.dataService.body_add_author);

    return PostRequest(baseURL + 'AddAuthor/', this.dataService.body_add_author)
      .then((response) => {
        this.resetBodyAddAuthor();
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error;
      });
  }

  private resetBodyAddAuthor(): void {
    this.dataService.body_add_author = {
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

  /////////////////////////////////////////////////////////////////////////
  // CATEGORIE  //////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  public CreateCategory(): Promise<any> {
    this.dataService.body_add_category.categoryID = this.getNewID(
      this.dataService.getCategories(),
      'categoryID'
    );

    this.dataService.addCategory(this.dataService.body_add_category);

    return PostRequest(
      baseURL + 'AddAuthor/',
      this.dataService.body_add_category
    )
      .then((response) => {
        this.resetBodyAddCategory();
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error;
      });
  }

  private resetBodyAddCategory(): void {
    this.dataService.body_add_category = {
      categoryID: 0,
      name: '',
      addedDate: today,
      lastUpdateDate: today,
      description: '',
    };
  }
}
