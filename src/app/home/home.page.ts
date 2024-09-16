import { Component, OnInit } from '@angular/core';
import { ModalController, RefresherCustomEvent } from '@ionic/angular';
import { GetRequest, PostRequest } from '../services/request.service';
import { ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ElementRef } from '@angular/core';

import {
  DatabaseObject,
  Author,
  Category,
  Publisher,
  Shopkeeper,
  LoginObject,
  Provenance,
  GeographicalOrigin,
  Warehouse,
  TypeObject,
} from '../services/interfaces.service';
import {
  today,
  username,
  token_JWT_success,
  token_JWT,
  user_role,
} from '../services/data.service';
import { baseURL } from '../enviroenment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home', // page name
  templateUrl: 'home.page.html', // page html
  styleUrls: ['home.page.scss'], // page style
})
export class HomePage implements OnInit {
  [x: string]: any;
  $event: any;

  username: string = username;
  token_JWT_success: string = token_JWT_success;
  token_JWT: string = token_JWT;
  user_role: string = user_role;

  body_login: LoginObject = {
    email: '',
    password: '',
    shopkeeper: '',
    username: '',
  };

  ngOnInit() {
    this.getScreenSize();
    this.toggleMenu();
  }

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController,
    private router: Router
  ) {}

  /////////// FRONTEND VARIABLES //////////////////

  isOpen: boolean = false;
  fileEvent: Event | undefined;

  // PopOver ////////////////////////////////////

  showAddPopover: boolean = false;
  showModifyPopover: boolean = false;
  showDeletePopover: boolean = false;

  // VIEWS TO SHOW //////////////////////////////

  sectionToShow: string = 'Store'; // initial value = Store
  messageDismissModal: string = '';

  // FRONTEND FUNCTIONS /////////////////////////

  @ViewChild('menuAncora', { static: false }) menuAncora:
    | ElementRef
    | undefined;
  @ViewChild('grigliaElementi', { static: false }) grigliaElementi:
    | ElementRef
    | undefined;

  isMenuAnchored: boolean = true;

  sizeColumnFilter: string = '0'; // Dimensione predefinita

  screenSize = this.checkScreenSize();

  logOut() {
    console.log('log out in corso');
    this.router.navigate(['/login']); // Reindirizza alla pagina di login
    localStorage.setItem('token_JWT', '');
    localStorage.setItem('token_JWT_success', '');
    localStorage.setItem('shopkeeper', '');
    localStorage.setItem('email', '');
    localStorage.setItem('password', '');
    localStorage.setItem('username', '');
    this.cancel();
  }

  toggleMenu() {
    this.isMenuAnchored = !this.isMenuAnchored;
    this.updateSize();
  }

  updateSize() {
    this.sizeColumnFilter = this.isMenuAnchored ? '2' : '0';
  }

  checkScreenSize(): string {
    const screenWidth = window.innerWidth;
    const myScreen = screenWidth < 700 ? 'mobile' : 'desktop';
    return myScreen;
  }

  getScreenSize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    console.log('Larghezza dello schermo: ' + screenWidth + 'px');
    console.log('Altezza dello schermo: ' + screenHeight + 'px');
  }

  openFirstMenu() {
    this.menuCtrl.open('first-menu');
  }

  @ViewChild('popover') popover: any;

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  showToast(message: string, color: string) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.color = color;
    toast.duration = 3000;
    document.body.appendChild(toast);
    return toast.present();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.messageDismissModal = `Hello, ${this.body_login.username}!`;
    }
  }

  switchToView(value: string) {
    console.log('switchToView() | view before ', this.sectionToShow);
    this.sectionToShow = value;
    this.searchInput = '';
    this.getAuthors(this.searchInput);
    this.getCategories(this.searchInput);
    this.getGeographicalOrigins(this.searchInput);
    this.getItems(this.searchInput);
    this.getProvenances(this.searchInput);
    this.getPublishers(this.searchInput);
    this.getShopkeepers(this.searchInput);
    this.getTypeObjects(this.searchInput);
    this.getWarehouses(this.searchInput);
    this.searchYears.lower = 1805;
    this.searchYears.upper = 2024;
    console.log('switchToView() | view AFTER ', this.sectionToShow);
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  AdminTables: Array<string> = [
    'Author', //
    'Publisher', //
    'Category', //
    'Shopkeeper', //
    'Warehouse',
    'Provenance', //
    'GeographicalOrigin', //
    'TypeObject', //
  ];

  // OBJECTS

  allDatabase: Array<DatabaseObject> = [];
  filteredObjects: Array<DatabaseObject> = [];

  promiseDatabase: Promise<DatabaseObject[]> | undefined = GetRequest(
    baseURL + 'GetObjects'
  ).then((res) => {
    console.log('Oggetti inviati dal database', res);
    this.allDatabase = res;
    console.log('Database degli Oggetti', this.allDatabase);

    return (this.filteredObjects = this.allDatabase);
  });

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

  getItems(input: string | undefined | null) {
    console.log('Filter Object results');
    // Get all the items from the database request
    // 1. get all the values from the database
    // 2. filter the database objects based on the search text
    this.filteredObjects = this.allDatabase;
    // if there is no search text give me every datapoint
    if (input == '' || input == null || input == undefined) {
      this.filteredObjects = this.filterByYearsObjects(this.filteredObjects);
      this.filteredObjects = this.filterByAvaiability(this.filteredObjects);
      this.filteredObjects = this.filterByGeneres(this.filteredObjects);
    } else {
      this.filteredObjects = this.allDatabase.filter((object) => {
        return object.title.toLowerCase().includes(input.toLowerCase());
      });
      this.filteredObjects = this.filterByYearsObjects(this.filteredObjects);
      this.filteredObjects = this.filterByAvaiability(this.filteredObjects);
      this.filteredObjects = this.filterByGeneres(this.filteredObjects);
    }
  }

  //       AUTORI

  allAuthors: Array<Author> = [];
  filteredAuthors: Array<Author> = [];

  promiseallAuthors: Promise<Author[]> = GetRequest(
    baseURL + 'GetAuthors'
  ).then((res) => {
    console.log('Author inviati dal database', res);
    this.allAuthors = res;
    return (this.filteredAuthors = this.allAuthors);
  });

  body_add_author: Author = {
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

  getAuthors(input: string | undefined | null) {
    this.filteredAuthors = this.allAuthors;
    // if there is no search text give me every datapoint
    if (input == '' || input == null || input == undefined) {
      this.filteredAuthors = this.filterByYears(this.filteredAuthors);
    } else {
      this.filteredAuthors = this.allAuthors.filter((object) => {
        return object.name.toLowerCase().includes(input.toLowerCase());
      });
      this.filteredAuthors = this.filterByYears(this.filteredAuthors);
    }
    console.log('Filter results of getAuthors() => ', this.allAuthors);
  }

  getNewIDAuthor(elementList: Array<Author>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].authorID > highestID) {
        highestID = elementList[i].authorID;
      }
    }
    return highestID + 1;
  }

  CreateAuthor(): Promise<any> {
    this.body_add_author.authorID = this.getNewIDAuthor(this.filteredAuthors);
    let newAuthor = this.body_add_author;
    this.allAuthors.unshift(newAuthor);
    this.getAuthors(this.searchInput);
    console.log('POST api/AddAuthor/ ', this.body_add_author);
    // Perform the PostRequest
    return PostRequest(baseURL + 'AddAuthor/', this.body_add_author)
      .then((response) => {
        // Reset bodyAddAuthor to null after the PostRequest
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
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error; // Propagate the error
      });
  }

  updateAuthors(items: any[], itemToDelete: any, key: string) {
    this.filteredAuthors = items.filter(
      (element) => element[key] !== itemToDelete[key]
    );
    this.allAuthors = items.filter(
      (element) => element[key] !== itemToDelete[key]
    );
    console.log('Update Authors/', this.allAuthors, this.filteredAuthors);
    return this.allAuthors;
  }

  //       Category

  allCategories: Array<Category> = [];
  filteredCategories: Array<Category> = [];

  promiseallCategories: Promise<Category[]> = GetRequest(
    baseURL + 'GetCategories'
  ).then((res) => {
    console.log('Category inviati dal database', res);
    this.allCategories = res;
    return (this.filteredCategories = this.allCategories);
  });

  body_add_category: Category = {
    categoryID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  getCategories(input: string | undefined | null) {
    this.filteredCategories = this.allCategories;
    // if there is no search text give me every datapoint
    if (input == '' || input == null || input == undefined) {
      this.filteredCategories = this.filterByYears(this.filteredCategories);
    } else {
      this.filteredCategories = this.allCategories.filter((object) => {
        return object.name.toLowerCase().includes(input.toLowerCase());
      });
      this.filteredCategories = this.filterByYears(this.filteredCategories);
    }
    console.log('results of getCategories() => ', this.filteredCategories);
  }

  getNewIDCategory(elementList: Array<Category>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].categoryID > highestID) {
        highestID = elementList[i].categoryID;
      }
    }
    return highestID + 1;
  }

  CreateCategory(): Promise<any> {
    this.body_add_category.categoryID = this.getNewIDCategory(
      this.filteredCategories
    );
    let new_element = this.body_add_category;

    this.allCategories.unshift(new_element);
    this.getCategories(this.searchInput);
    console.log('POST api/AddCategory/ ', this.body_add_category);
    // Perform the PostRequest
    return PostRequest(baseURL + 'AddCategory/', this.body_add_category)
      .then((response) => {
        // Reset bodyAddAuthor to null after the PostRequest
        this.body_add_category = {
          categoryID: 0,
          name: '',
          addedDate: today,
          lastUpdateDate: today,
          description: '',
        };
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error; // Propagate the error
      });
  }

  updateCategories(items: any[], itemToDelete: any, key: string) {
    this.allCategories = items.filter(
      (element) => element[key] !== itemToDelete[key]
    );
    console.log('Update Categories/', items);
    this.getCategories('');
    this.filteredCategories = this.allCategories;
    return this.filteredCategories;
  }

  //       Publisher

  allPublishers: Array<Publisher> = [];
  filteredPublishers: Array<Publisher> = [];

  promiseallPublishers: Promise<Publisher[]> = GetRequest(
    baseURL + 'GetPublishers'
  ).then((res) => {
    console.log('Publisher inviati dal database', res);
    this.allPublishers = res;
    return (this.filteredPublishers = this.allPublishers);
  });

  body_add_publisher: Publisher = {
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

  getPublishers(input: string | undefined | null) {
    this.filteredPublishers = this.allPublishers;
    // if there is no search text give me every datapoint
    if (input == '' || input == null || input == undefined) {
      this.filteredPublishers = this.filterByYears(this.filteredPublishers);
    } else {
      this.filteredPublishers = this.allPublishers.filter((object) => {
        return object.name.toLowerCase().includes(input.toLowerCase());
      });
      this.filteredPublishers = this.filterByYears(this.filteredPublishers);
    }
    console.log(
      'Filter results of getPublishers() => ',
      this.filteredPublishers
    );
  }

  getNewIDPublisher(elementList: Array<Publisher>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].publisherID > highestID) {
        highestID = elementList[i].publisherID;
      }
    }
    return highestID + 1;
  }

  CreatePublisher(): Promise<any> {
    this.body_add_publisher.publisherID = this.getNewIDPublisher(
      this.filteredPublishers
    );

    let new_element = this.body_add_publisher;
    this.allPublishers.unshift(new_element);
    this.getPublishers(this.searchInput);

    console.log('POST api/AddPublisher/ ', this.body_add_publisher);

    // Perform the PostRequest
    return PostRequest(baseURL + 'AddPublisher/', this.body_add_publisher)
      .then((response) => {
        // Reset bodyAddAuthor to null after the PostRequest
        this.body_add_publisher = {
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
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error; // Propagate the error
      });
  }

  updatePublishers(items: any[], itemToDelete: any, key: string) {
    this.allPublishers = items.filter(
      (element) => element[key] !== itemToDelete[key]
    );
    console.log('Update Publishers/', items);
    this.getPublishers('');
    this.filteredPublishers = this.allPublishers;
    return this.filteredPublishers;
  }

  //       ESERCENTI

  allShopkeepers: Array<Shopkeeper> = [];
  filteredShopkeepers: Array<Shopkeeper> = [];

  promiseallShopkeepers: Promise<Shopkeeper[]> = GetRequest(
    baseURL + 'GetShopkeepers'
  ).then((res) => {
    console.log('Shopkeeper inviati dal database', res);
    this.allShopkeepers = res;
    return (this.filteredShopkeepers = this.allShopkeepers);
  });

  body_add_shopkeeper: Shopkeeper = {
    shopkeeperID: 0,
    uniqueName: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
    telephone1: '',
    telephone2: '',
    email: '',
    notes: '',
  };

  getShopkeepers(input: string | undefined | null) {
    this.filteredShopkeepers = this.allShopkeepers;
    // if there is no search text give me every datapoint
    if (input == '' || input == null || input == undefined) {
      this.filteredShopkeepers = this.filterByYears(this.filteredShopkeepers);
    } else {
      this.filteredShopkeepers = this.allShopkeepers.filter((object) => {
        return object.uniqueName.toLowerCase().includes(input.toLowerCase());
      });
      this.filteredShopkeepers = this.filterByYears(this.filteredShopkeepers);
    }
    console.log(
      'Filter results of getShopkeepers() => ',
      this.filteredShopkeepers
    );
  }

  getNewIDShopkeeper(elementList: Array<Shopkeeper>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].shopkeeperID > highestID) {
        highestID = elementList[i].shopkeeperID;
      }
    }
    return highestID + 1;
  }

  CreateShopkeeper(): Promise<any> {
    this.body_add_shopkeeper.shopkeeperID = this.getNewIDShopkeeper(
      this.filteredShopkeepers
    );
    let new_element = this.body_add_shopkeeper;
    this.allShopkeepers.unshift(new_element);
    this.getShopkeepers(this.searchInput);

    console.log('POST api/AddShopkeeper/ ', this.body_add_shopkeeper);
    // Perform the PostRequest
    return PostRequest(baseURL + 'AddShopkeeper/', this.body_add_shopkeeper)
      .then((response) => {
        // Reset bodyAddAuthor to null after the PostRequest
        this.body_add_shopkeeper = {
          shopkeeperID: 0,
          uniqueName: '',
          addedDate: today,
          lastUpdateDate: today,
          description: '',
          telephone1: '',
          telephone2: '',
          email: '',
          notes: '',
        };
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error; // Propagate the error
      });
  }

  updateShopkeepers(items: any[], itemToDelete: any, key: string) {
    this.allShopkeepers = items.filter(
      (element) => element[key] !== itemToDelete[key]
    );
    console.log('Update Shopkeepers/', items);
    this.getShopkeepers('');
    this.filteredShopkeepers = this.allShopkeepers;
    return this.filteredShopkeepers;
  }

  //       MAGAZZINI

  allWarehouses: Array<Warehouse> = [];
  filteredWarehouses: Array<Warehouse> = [];

  promiseallWarehouses: Promise<Warehouse[]> = GetRequest(
    baseURL + 'GetWarehouses'
  ).then((res) => {
    console.log('Warehouse inviati dal database', res);
    this.allWarehouses = res;
    return (this.filteredWarehouses = this.allWarehouses);
  });

  body_add_warehouse: Warehouse = {
    warehouseID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
    notes: '',
    email: '',
    telephone1: '',
    telephone2: '',
  };

  getWarehouses(input: string | undefined | null) {
    this.filteredWarehouses = this.allWarehouses;
    // if there is no search text give me every datapoint
    if (input == '' || input == null || input == undefined) {
      this.filteredWarehouses = this.filterByYears(this.filteredWarehouses);
    } else {
      this.filteredWarehouses = this.allWarehouses.filter((object) => {
        return object.name.toLowerCase().includes(input.toLowerCase());
      });
      this.filteredWarehouses = this.filterByYears(this.filteredWarehouses);
    }
    console.log(
      'Filter results of getWarehouses() => ',
      this.filteredWarehouses
    );
  }

  getNewIDWarehouse(elementList: Array<Warehouse>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].warehouseID > highestID) {
        highestID = elementList[i].warehouseID;
      }
    }
    return highestID + 1;
  }

  CreateWarehouse(): Promise<any> {
    this.body_add_warehouse.warehouseID = this.getNewIDWarehouse(
      this.filteredWarehouses
    );
    let new_element = this.body_add_warehouse;
    this.allWarehouses.unshift(new_element);
    this.getWarehouses(this.searchInput);
    // Perform the PostRequest
    return PostRequest(baseURL + 'AddWarehouse/', this.body_add_warehouse)
      .then((response) => {
        // Reset bodyAddAuthor to null after the PostRequest
        this.body_add_warehouse = {
          warehouseID: 0,
          name: '',
          addedDate: today,
          lastUpdateDate: today,
          description: '',
          notes: '',
          email: '',
          telephone1: '',
          telephone2: '',
        };
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error; // Propagate the error
      });
  }

  updateWarehouses(items: any[], itemToDelete: any, key: string) {
    this.allWarehouses = items.filter(
      (element) => element[key] !== itemToDelete[key]
    );
    console.log('Update Warehouses/', items);
    this.getWarehouses('');
    this.filteredWarehouses = this.allWarehouses;
    return this.filteredWarehouses;
  }

  //       PROVENIENZE

  allProvenances: Array<Provenance> = [];
  filteredProvenances: Array<Provenance> = [];

  promiseallProvenances: Promise<Provenance[]> = GetRequest(
    baseURL + 'GetProvenances'
  ).then((res) => {
    console.log('Provenance inviati dal database', res);
    this.allProvenances = res;
    return (this.filteredProvenances = this.allProvenances);
  });

  body_add_provenance: Provenance = {
    provenanceID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  getProvenances(input: string | undefined | null) {
    this.filteredProvenances = this.allProvenances;
    // if there is no search text give me every datapoint
    if (input == '' || input == null || input == undefined) {
      this.filteredProvenances = this.filterByYears(this.filteredProvenances);
    } else {
      this.filteredProvenances = this.allProvenances.filter((object) => {
        return object.name.toLowerCase().includes(input.toLowerCase());
      });
      this.filteredProvenances = this.filterByYears(this.filteredProvenances);
    }
    console.log(
      'Filter results of getProvenances() => ',
      this.filteredProvenances
    );
  }

  getNewIDProvenance(elementList: Array<Provenance>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].provenanceID > highestID) {
        highestID = elementList[i].provenanceID;
      }
    }
    return highestID + 1;
  }

  CreateProvenance(): Promise<any> {
    this.body_add_provenance.provenanceID = this.getNewIDProvenance(
      this.filteredProvenances
    );
    let new_element = this.body_add_provenance;
    this.allProvenances.unshift(new_element);
    this.getProvenances(this.searchInput);
    // Perform the PostRequest
    console.log('AddProvenance/ -->  ', this.body_add_provenance);
    return PostRequest(baseURL + 'AddProvenance/', this.body_add_provenance)
      .then((response) => {
        // Reset bodyAddAuthor to null after the PostRequest
        this.body_add_provenance = {
          provenanceID: 0,
          name: '',
          addedDate: today,
          lastUpdateDate: today,
          description: '',
        };
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error; // Propagate the error
      });
  }

  updateProvenances(items: any[], itemToDelete: any, key: string) {
    this.allProvenances = items.filter(
      (element) => element[key] !== itemToDelete[key]
    );
    console.log('Update Provenances/', this.allProvenances);
    this.getProvenances('');
    this.filteredProvenances = this.allProvenances;
    return this.filteredProvenances;
  }

  //      ORIGINE GEOGRAFICA

  allGeographicalOrigins: Array<GeographicalOrigin> = [];
  filteredGeographicalOrigins: Array<GeographicalOrigin> = [];

  promiseallGeographicalOrigins: Promise<GeographicalOrigin[]> = GetRequest(
    baseURL + 'GetGeographicalOrigins'
  ).then((res) => {
    console.log('GeographicalOrigin inviati dal database', res);
    this.allGeographicalOrigins = res;
    return (this.filteredGeographicalOrigins = this.allGeographicalOrigins);
  });

  body_add_geographical_origin: GeographicalOrigin = {
    geographicalOriginID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  getGeographicalOrigins(input: string | undefined | null) {
    this.filteredGeographicalOrigins = this.allGeographicalOrigins;
    // if there is no search text give me every datapoint
    if (input == '' || input == null || input == undefined) {
      this.filteredGeographicalOrigins = this.filterByYears(
        this.filteredGeographicalOrigins
      );
    } else {
      this.filteredGeographicalOrigins = this.allGeographicalOrigins.filter(
        (object) => {
          return object.name.toLowerCase().includes(input.toLowerCase());
        }
      );
      this.filteredGeographicalOrigins = this.filterByYears(
        this.filteredGeographicalOrigins
      );
    }
    console.log(
      'Filter results of getGeographicalOrigins() => ',
      this.filteredGeographicalOrigins
    );
  }

  getNewIDGeographicalOrigin(elementList: Array<GeographicalOrigin>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].geographicalOriginID > highestID) {
        highestID = elementList[i].geographicalOriginID;
      }
    }
    return highestID + 1;
  }

  CreateGeographicalOrigin(): Promise<any> {
    this.body_add_geographical_origin.geographicalOriginID =
      this.getNewIDGeographicalOrigin(this.filteredGeographicalOrigins);
    let new_element = this.body_add_geographical_origin;
    this.allGeographicalOrigins.unshift(new_element);
    this.getGeographicalOrigins(this.searchInput);
    // Perform the PostRequest
    return PostRequest(
      baseURL + 'AddGeographicalOrigin/',
      this.body_add_geographical_origin
    )
      .then((response) => {
        // Reset bodyAddAuthor to null after the PostRequest
        this.body_add_geographical_origin = {
          geographicalOriginID: 0,
          name: '',
          addedDate: today,
          lastUpdateDate: today,
          description: '',
        };
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error; // Propagate the error
      });
  }

  updateGeographicalOrigins(items: any[], itemToDelete: any, key: string) {
    this.allGeographicalOrigins = items.filter(
      (element) => element[key] !== itemToDelete[key]
    );
    console.log('Update GeographicalOrigins/', items);
    this.getGeographicalOrigins(this.searchInput);
    this.filteredGeographicalOrigins = this.allGeographicalOrigins;
    return this.filteredGeographicalOrigins;
  }

  //      TIPI DI OGGETTI

  allTypeObjects: Array<TypeObject> = [];
  filteredTypeObjects: Array<TypeObject> = [];

  promiseallTypeObjects: Promise<TypeObject[]> = GetRequest(
    baseURL + 'GetTypeObjects'
  ).then((res) => {
    console.log('TypeObject inviati dal database', res);
    this.allTypeObjects = res;
    return (this.filteredTypeObjects = this.allTypeObjects);
  });

  body_add_type_object: TypeObject = {
    typeID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  getTypeObjects(input: string | undefined | null) {
    this.filteredTypeObjects = this.allTypeObjects;
    // if there is no search text give me every datapoint
    if (input == '' || input == null || input == undefined) {
      this.filteredTypeObjects = this.filterByYears(this.filteredTypeObjects);
    } else {
      this.filteredTypeObjects = this.allTypeObjects.filter((object) => {
        return object.name.toLowerCase().includes(input.toLowerCase());
      });
      this.filteredTypeObjects = this.filterByYears(this.filteredTypeObjects);
    }
    console.log(
      'Filter results of getTypeObjects() => ',
      this.filteredTypeObjects
    );
  }

  getNewIDTypeObject(elementList: Array<TypeObject>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].typeID > highestID) {
        highestID = elementList[i].typeID;
      }
    }
    return highestID + 1;
  }

  CreateTypeObject(): Promise<any> {
    this.body_add_type_object.typeID = this.getNewIDTypeObject(
      this.filteredTypeObjects
    );
    let new_element = this.body_add_type_object;
    this.allTypeObjects.unshift(new_element);
    this.getTypeObjects(this.searchInput);

    // Perform the PostRequest
    return PostRequest(baseURL + 'AddType/', this.body_add_type_object)
      .then((response) => {
        // Reset bodyAddAuthor to null after the PostRequest
        this.body_add_type_object = {
          typeID: 0,
          name: '',
          addedDate: today,
          lastUpdateDate: today,
          description: '',
        };
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error; // Propagate the error
      });
  }

  updateTypeObject(items: any[], itemToDelete: any, key: string) {
    this.allTypeObjects = items.filter(
      (element) => element[key] !== itemToDelete[key]
    );
    this.getTypeObjects(this.searchInput);
    this.filteredTypeObjects = this.allTypeObjects;
    console.log('Update TypeObjects ', this.filteredTypeObjects);
    return this.filteredTypeObjects;
  }

  ////// FILTRI DI RICERCA

  availability: string = 'tutti'; // initial aviability filter checkbox
  searchInput: string | undefined | null = ''; // initial search input
  searchGeneres: Array<string> = []; // array for containing choosen generes
  searchYears = { lower: 1800, upper: 2024 }; // min and maximum years filter

  setInput(input: string | undefined | null) {
    if (input !== undefined && input !== null) {
      this.searchInput = input;
    } else {
      this.searchInput = ''; // oppure this.searchInput = 'valore predefinito';
    }
  }

  filterByYears<T extends { addedDate: Date }>(filteredItems: T[]): T[] {
    console.log(this.searchYears.lower, this.searchYears.upper);
    return filteredItems.filter((item) => {
      if (item.addedDate != null) {
        const year = new Date(item.addedDate).getFullYear();
        const lowerYear = Number.isNaN(this.searchYears.lower)
          ? 1800
          : this.searchYears.lower;
        const upperYear = Number.isNaN(this.searchYears.upper)
          ? new Date().getFullYear()
          : this.searchYears.upper;

        return (
          year >= new Date(lowerYear, 0, 1).getFullYear() &&
          year <= new Date(upperYear, 0, 1).getFullYear()
        );
      }
      return true; // Include items with null addedDate
    });
  }

  filterByYearsObjects<T extends { discoveryDate: Date }>(
    filteredItems: T[]
  ): T[] {
    console.log(this.searchYears.lower, this.searchYears.upper);
    return filteredItems.filter((item) => {
      if (item.discoveryDate != null) {
        const year = new Date(item.discoveryDate).getFullYear();
        const lowerYear = Number.isNaN(this.searchYears.lower)
          ? 1800
          : this.searchYears.lower;
        const upperYear = Number.isNaN(this.searchYears.upper)
          ? new Date().getFullYear()
          : this.searchYears.upper;

        return (
          year >= new Date(lowerYear, 0, 1).getFullYear() &&
          year <= new Date(upperYear, 0, 1).getFullYear()
        );
      }
      return true; // Include items with null addedDate
    });
  }

  filterByAvaiability(filteredObjects: DatabaseObject[]) {
    var result: DatabaseObject[] = filteredObjects;
    if (this.availability == 'solo_disponibili') {
      result = filteredObjects.filter((object) => {
        return object.avaiable == true;
      });
      return result;
    } else {
      return result;
    }
  }

  filterByGeneres(filteredObjects: DatabaseObject[]) {
    var result: DatabaseObject[] = filteredObjects;
    if (this.searchGeneres.length > 0) {
      result = filteredObjects.filter((obj) =>
        this.searchGeneres.includes(obj.genere)
      );
      return result;
    } else {
      return result;
    }
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }
}
