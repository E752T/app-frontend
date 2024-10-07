import { GetRequest } from '../services/request.service';
import { baseURL } from '../enviroenment';

import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

export interface User {
  admin: number;
  username: string;
  email: string;
  shopkeeper: string;
  description: string;
  userID: number;
  addedDate: Date;
  lastUpdateDate: Date;
  notes: string;
  password: string;
  shopkeeperID: number;
  telephone1: string;
  telephone2: string;
}

export interface LoginObject {
  email: string | null;
  password: string | null;
  shopkeeper: string | null;
  username: string | null;
}

export interface DatabaseObject {
  [x: string]: any;
  objectID: number;
  shopkeeperID: number;
  userID: number;
  categoryID: number;
  typeID: number;
  warehouseID: number;
  provenanceID: number;
  geographicalOriginID: number;
  authorID: number;
  publisherID: number;
  genere: string;
  avaiable: boolean;
  authorDescription: string;
  discoveryPlace: string;
  addedDate: Date;
  lastUpdateDate: Date;
  discoveryDate: Date;
  censusDate: Date;
  sortOrder: number;
  cover: string;
  scan01: string;
  scan02: string;
  scan03: string;
  title: string;
  subtitle: string;
  objectNotes: string;
  warehouseRoom: string;
  rackNumber: number;
  position: number;
  htmlDescription1: string;
  htmlDescription2: string;
}

export interface ObjectCard {
  nameAuthor: string;
  objectID: number;
  authorID: number;
  nameBook: string;
  genere: string;
  avaiable: boolean;
  cover: string;
  discoveryDate: Date;
  descriptionBook: string;
  authorDescription: string;
}

export interface Author {
  authorID: number;
  name: string;
  addedDate: Date;
  lastUpdateDate: Date;
  description: string;
  email: string;
  telephone1: string;
  telephone2: string;
  notes: string;
}

export interface GeographicalOrigin {
  geographicalOriginID: number;
  addedDate: Date;
  lastUpdateDate: Date;
  name: string;
  description: string;
}

export interface TypeObject {
  typeID: number;
  addedDate: Date;
  lastUpdateDate: Date;
  name: string;
  description: string;
}

export interface Shopkeeper {
  shopkeeperID: number;
  uniqueName: string;
  description: string;
  addedDate: Date;
  lastUpdateDate: Date;
  email: string;
  telephone1: string;
  telephone2: string;
  notes: string;
}

export interface Warehouse {
  warehouseID: number;
  addedDate: Date;
  lastUpdateDate: Date;
  name: string;
  description: string;
  email: string;
  telephone1: string;
  telephone2: string;
  notes: string;
}

export interface Publisher {
  publisherID: number;
  addedDate: Date;
  lastUpdateDate: Date;
  name: string;
  description: string;
  email: string;
  telephone1: string;
  telephone2: string;
  notes: string;
}

export interface Provenance {
  provenanceID: number;
  addedDate: Date;
  lastUpdateDate: Date;
  name: string;
  description: string;
}

export interface Category {
  categoryID: number;
  addedDate: Date;
  lastUpdateDate: Date;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
  // Questo rende il servizio disponibile in tutta l'app
})
export class DataService implements OnInit {
  constructor(private http: HttpClient) {}
  today: Date = new Date();
  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit() {
    this.initializeData();
  }

  // VARIABILI
  // User
  private username: string | null = null;
  private userRole: string | null = null;
  private tokenJWT: string | null = null;
  private tokenJWTsuccess: boolean | null = null;
  private bodyLogin: any = {};

  // Objects
  public allDatabase: Array<DatabaseObject> = [];
  public filteredObjects: Array<DatabaseObject> = [];

  // Authors /////////////////////////////////////////////////////////////
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

  public body_update_author: Author = {
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

  private allAuthors: Array<Author> = [];

  setAuthors(authors: Array<Author>) {
    this.allAuthors = authors;
  }

  getAuthors(): Array<Author> {
    return this.allAuthors;
  }

  addAuthor(author: Author): void {
    this.allAuthors.push(author);
  }

  // Categories /////////////////////////////////////////////////////////////
  private allCategories: Array<Category> = [];

  public body_add_category: Category = {
    categoryID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  public body_update_category: Category = {
    categoryID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  setCategories(categories: Array<Category>) {
    this.allCategories = categories;
  }

  getCategories(): Array<Category> {
    return this.allCategories;
  }

  addCategory(category: Category): void {
    this.allCategories.push(category);
  }

  // TypeObject /////////////////////////////////////////////////////////////
  private allTypeObjects: Array<TypeObject> = [];
  body_add_type_object: TypeObject = {
    typeID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  body_update_type_object: TypeObject = {
    typeID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };
  setTypeObjects(typeObjects: Array<TypeObject>) {
    this.allTypeObjects = typeObjects;
  }

  getTypeObjects(): Array<TypeObject> {
    return this.allTypeObjects;
  }

  addTypeObject(typeObject: TypeObject): void {
    this.allTypeObjects.push(typeObject);
  }

  // GeographicalOrigin /////////////////////////////////////////////////////////////
  private allGeographicalOrigins: Array<GeographicalOrigin> = [];

  body_add_geographical_origin: GeographicalOrigin = {
    geographicalOriginID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  body_update_geographical_origin: GeographicalOrigin = {
    geographicalOriginID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  setGeographicalOrigins(geographicalOrigins: Array<GeographicalOrigin>) {
    this.allGeographicalOrigins = geographicalOrigins;
  }

  getGeographicalOrigins(): Array<GeographicalOrigin> {
    return this.allGeographicalOrigins;
  }

  addGeographicalOrigin(geographicalOrigin: GeographicalOrigin): void {
    this.allGeographicalOrigins.push(geographicalOrigin);
  }
  // Publisher /////////////////////////////////////////////////////////////
  private allPublishers: Array<Publisher> = [];

  public body_add_publisher: Publisher = {
    publisherID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
    email: '',
    telephone1: '',
    telephone2: '',
    notes: '',
  };

  public body_update_publisher: Publisher = {
    publisherID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
    email: '',
    telephone1: '',
    telephone2: '',
    notes: '',
  };

  setPublishers(publishers: Array<Publisher>) {
    this.allPublishers = publishers;
  }

  getPublishers(): Array<Publisher> {
    return this.allPublishers;
  }

  addPublisher(publisher: Publisher): void {
    this.allPublishers.push(publisher);
  }
  // Shopkeeper /////////////////////////////////////////////////////////////
  private allShopkeepers: Array<Shopkeeper> = [];

  body_add_shopkeeper: Shopkeeper = {
    shopkeeperID: 0,
    uniqueName: '',
    addedDate: this.today,
    lastUpdateDate: this.today,
    description: '',
    telephone1: '',
    telephone2: '',
    email: '',
    notes: '',
  };

  body_update_shopkeeper: Shopkeeper = {
    shopkeeperID: 0,
    uniqueName: '',
    addedDate: this.today,
    lastUpdateDate: this.today,
    description: '',
    telephone1: '',
    telephone2: '',
    email: '',
    notes: '',
  };

  setShopkeepers(shopkeepers: Array<Shopkeeper>) {
    this.allShopkeepers = shopkeepers;
  }

  getShopkeepers(): Array<Shopkeeper> {
    return this.allShopkeepers;
  }

  addShopkeeper(shopkeeper: Shopkeeper): void {
    this.allShopkeepers.push(shopkeeper);
  }
  // Provenance /////////////////////////////////////////////////////////////
  private allProvenances: Array<Provenance> = [];

  body_add_provenance: Provenance = {
    provenanceID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  body_update_provenance: Provenance = {
    provenanceID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  setProvenances(provenances: Array<Provenance>) {
    this.allProvenances = provenances;
  }

  getProvenances(): Array<Provenance> {
    return this.allProvenances;
  }

  addProvenance(provenance: Provenance): void {
    this.allProvenances.push(provenance);
  }

  // Warehouse /////////////////////////////////////////////////////////////
  private allWarehouses: Array<Warehouse> = [];

  body_add_warehouse: Warehouse = {
    warehouseID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
    email: '',
    telephone1: '',
    telephone2: '',
    notes: '',
  };

  body_update_warehouse: Warehouse = {
    warehouseID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
    email: '',
    telephone1: '',
    telephone2: '',
    notes: '',
  };

  setWarehouses(warehouses: Array<Warehouse>) {
    this.allWarehouses = warehouses;
  }

  getWarehouses(): Array<Warehouse> {
    return this.allWarehouses;
  }

  addWarehouse(warehouse: Warehouse): void {
    this.allWarehouses.push(warehouse);
  }

  // User /////////////////////////////////////////////////////////////

  private current_user: User = {
    admin: 0,
    username: '',
    email: '',
    shopkeeper: '',
    description: '',
    userID: 0,
    addedDate: today,
    lastUpdateDate: today,
    notes: '',
    password: '',
    shopkeeperID: 0,
    telephone1: '',
    telephone2: '',
  };

  setCurrentUser(user: User) {
    this.current_user = user;
  }

  getCurrentUser(): User {
    return this.current_user;
  }

  ////////////////////////////////////////////////////////////////////
  // LOGIN
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

  ////////////////////////////////////////////////////////////////////
  // OBJECTS DATABASE

  getObjectById(id: number): DatabaseObject | undefined | null {
    let response = this.allDatabase.find((obj) => obj.objectID === id);
    if (response !== null) {
      return response;
    } else {
      return null;
    }
  }

  private initializeData() {
    this.getAllDatabase(); // inizializzare i dati del database con un obervable
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

  removeObject(objectID: number) {
    const index = this.allDatabase.findIndex(
      (element: DatabaseObject) => element.objectID === objectID
    );

    if (index !== -1) {
      this.allDatabase.splice(index, 1);
    }
  }

  getFilteredObjects(): Array<DatabaseObject> {
    return this.filteredObjects;
  }

  get_body_add_object() {
    return this.body_add_object;
  }

  body_add_object: DatabaseObject = {
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
    sortOrder: 1,
    cover: '',
    scan01: '',
    scan02: '',
    scan03: '',
    title: '',
    subtitle: '',
    objectNotes: '',
    warehouseRoom: '',
    rackNumber: 1,
    position: 1,
    htmlDescription1: '',
    htmlDescription2: '',
  };

  objectData: DatabaseObject = {
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

  getObjectData(): DatabaseObject | null {
    return this.objectData;
  }

  setObjectData(objectData: DatabaseObject | null): void {
    if (objectData) {
      this.objectData = objectData;
    }
  }
}

export let body_login: LoginObject = {
  shopkeeper: localStorage.getItem('shopkeeper'),
  email: localStorage.getItem('email'),
  password: localStorage.getItem('password'),
  username: localStorage.getItem('username'),
};

const datePipe = new DatePipe('en-US');
export const today = new Date();
//---------------- DATABASE INITIALIZATION ----------------

export let body_update_object: DatabaseObject = {
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

export let body_add_object: DatabaseObject = {
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
