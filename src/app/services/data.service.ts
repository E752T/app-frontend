import {
  Author,
  Category,
  DatabaseObject,
  GeographicalOrigin,
  Provenance,
  Publisher,
  Shopkeeper,
  TypeObject,
  Warehouse,
} from '../services/interfaces.service';
import { LoginObject } from '../services/interfaces.service';
import { GetRequest } from '../services/request.service';
import { baseURL } from '../enviroenment';

import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Questo rende il servizio disponibile in tutta l'app
})
export class DataService implements OnInit {
  private username: string | null = null;
  private userRole: string | null = null;
  private tokenJWT: string | null = null;
  private tokenJWTsuccess: boolean | null = null;
  private bodyLogin: any = {};

  allDatabase: Array<DatabaseObject> = [];
  filteredObjects: Array<DatabaseObject> = [];

  constructor(private http: HttpClient) {}

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit() {
    this.initializeData();
  }

  private allCategories: Array<Category> = [];
  
  setCategories(categories: Array<Category>) {
    this.allCategories = categories;
  }

  getCategories(): Array<Category> {
    return this.allCategories;
  }


  getObjectById(id: number): DatabaseObject | undefined | null {
    let response = this.allDatabase.find((obj) => obj.objectID === id);
    if (response !== null) {
      return response;
    } else {
      return null;
    }
  }

  private initializeData() {
    // Metodo per inizializzare i dati
    this.getAllDatabase().subscribe({
      next: (data) => {
        this.allDatabase = data;
        this.filteredObjects = this.allDatabase;
      },
      error: (error) => {
        console.error('Errore nel recupero del database:', error);
        this.filteredObjects = []; // Gestione dell'errore
      },
    });
  }

  getAllDatabase(): Observable<Array<DatabaseObject>> {
    // Metodo per esportare allDatabase
    return new Observable((observer) => {
      GetRequest(baseURL + 'GetObjects')
        .then((res) => {
          this.allDatabase = res;
          observer.next(this.allDatabase);
          observer.complete();
        })
        .catch((error) => {
          console.error('Errore nel recupero del database:', error);
          observer.next([]); // Emit an empty array in caso di errore
          observer.complete();
        });
    });
  }

  getAllData() {
    return this.allDatabase;
  }

  getFilteredObjects(): Array<DatabaseObject> {
    return this.filteredObjects;
  }

  getBodyAddObject() {
    return this.bodyAddObject;
  }

  bodyAddObject: DatabaseObject = {
    objectID: 1,
    authorID: 1,
    userID: 1,
    shopkeeperID: 1,
    categoryID: 1,
    typeID: 1,
    warehouseID: 1,
    provenanceID: 1,
    geographicalOriginID: 1,
    publisherID: 1,
    genere: '',
    avaiable: false,
    authorDescription: '',
    discoveryPlace: '',
    addedDate: new Date(),
    lastUpdateDate: new Date(),
    discoveryDate: new Date(),
    censusDate: new Date(),
    sortOrder: 0,
    cover: '',
    scan01: '',
    scan02: '',
    scan03: '',
    title: '',
    subtitle: '',
    objectNotes: '',
    warehouseRoom: '',
    rackNumber: 0,
    position: 0,
    htmlDescription1: '',
    htmlDescription2: '',
  };

  setUsername(username: string): void {
    this.username = username;
  }

  getUsername(): string | null {
    return this.username;
  }

  setUserRole(role: string): void {
    this.userRole = role;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  setTokenJWT(token: string): void {
    this.tokenJWT = token;
  }

  getTokenJWT(): string | null {
    return this.tokenJWT;
  }

  setTokenJWTsuccess(token_JWT_success: boolean): void {
    this.tokenJWTsuccess = token_JWT_success;
  }

  getTokenJWTsuccess(): boolean | null {
    return this.tokenJWTsuccess;
  }

  setBodyLogin(body: any): void {
    this.bodyLogin = body;
  }

  getBodyLogin(): any {
    return this.bodyLogin;
  }
}

export let body_login: LoginObject = {
  shopkeeper: localStorage.getItem('shopkeeper'),
  email: localStorage.getItem('email'),
  password: localStorage.getItem('password'),
  username: localStorage.getItem('username'),
};

const datePipe = new DatePipe('en-US');
export const today = new Date(); // datePipe.transform(new Date(), 'yyyy-MM-dd');

//---------------- DATABASE INITIALIZATION ----------------
export let bodyModifyObject: DatabaseObject = {
  objectID: 1,
  authorID: 1,
  userID: 1,
  shopkeeperID: 1,
  categoryID: 1,
  typeID: 1,
  warehouseID: 1,
  provenanceID: 1,
  geographicalOriginID: 1,
  publisherID: 1,
  genere: '',
  avaiable: false,
  authorDescription: '',
  discoveryPlace: '',
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  discoveryDate: new Date(),
  censusDate: new Date(),
  sortOrder: 0,
  cover: '',
  scan01: '',
  scan02: '',
  scan03: '',
  title: '',
  subtitle: '',
  objectNotes: '',
  warehouseRoom: '',
  rackNumber: 0,
  position: 0,
  htmlDescription1: '',
  htmlDescription2: '',
};

export let bodyAddObject: DatabaseObject = {
  objectID: 1,
  authorID: 1,
  userID: 1,
  shopkeeperID: 1,
  categoryID: 1,
  typeID: 1,
  warehouseID: 1,
  provenanceID: 1,
  geographicalOriginID: 1,
  publisherID: 1,
  genere: '',
  avaiable: false,
  authorDescription: '',
  discoveryPlace: '',
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  discoveryDate: new Date(),
  censusDate: new Date(),
  sortOrder: 0,
  cover: '',
  scan01: '',
  scan02: '',
  scan03: '',
  title: '',
  subtitle: '',
  objectNotes: '',
  warehouseRoom: '',
  rackNumber: 0,
  position: 0,
  htmlDescription1: '',
  htmlDescription2: '',
};

export let bodyAddGeographicalOrigin: GeographicalOrigin = {
  geographicalOriginID: 0,
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  name: '',
  description: '',
};

export let bodyModifyGeographicalOrigin: GeographicalOrigin = {
  geographicalOriginID: 0,
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  name: '',
  description: '',
};

export let bodyAddTypeObject: TypeObject = {
  typeID: 0,
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  name: '',
  description: '',
};

export let bodyModifyTypeObject: TypeObject = {
  typeID: 0,
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  name: '',
  description: '',
};

export let bodyAddShopkeeper: Shopkeeper = {
  shopkeeperID: 0,
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  uniqueName: '',
  description: '',
  notes: '',
  email: '',
  telephone1: '',
  telephone2: '',
};

export let bodyModifyShopkeeper: Shopkeeper = {
  shopkeeperID: 0,
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  uniqueName: '',
  description: '',
  notes: '',
  email: '',
  telephone1: '',
  telephone2: '',
};

export let bodyAddWarehouse: Warehouse = {
  warehouseID: 0,
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  name: '',
  description: '',
  email: '',
  telephone1: '',
  telephone2: '',
  notes: '',
};

export let bodyModifyWarehouse: Warehouse = {
  warehouseID: 0,
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  name: '',
  description: '',
  email: '',
  telephone1: '',
  telephone2: '',
  notes: '',
};

export let bodyAddPublisher: Publisher = {
  publisherID: 0,
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  name: '',
  description: '',
  email: '',
  telephone1: '',
  telephone2: '',
  notes: '',
};

export let bodyModifyPublisher: Publisher = {
  publisherID: 0,
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  name: '',
  description: '',
  email: '',
  telephone1: '',
  telephone2: '',
  notes: '',
};

export let bodyAddProvenance: Provenance = {
  provenanceID: 0,
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  name: '',
  description: '',
};

export let bodyModifyProvenance: Provenance = {
  provenanceID: 0,
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  name: '',
  description: '',
};

export let bodyAddCategory: Category = {
  categoryID: 0,
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  name: '',
  description: '',
};

export let bodyModifyCategory: Category = {
  categoryID: 0,
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  name: '',
  description: '',
};

export let bodyAddAuthor: Author = {
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
