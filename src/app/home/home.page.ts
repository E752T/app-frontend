import { Component, inject, OnInit, Type } from '@angular/core';
import { ModalController, RefresherCustomEvent } from '@ionic/angular';
import { GetRequest, PostRequest } from '../services/request.service';
import { ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

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
  LoginObject,
} from '../services/interfaces.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { baseURL, today } from '../services/data.service';
import {
  bodyAddAuthor,
  bodyModifyObject,
  bodyAddObject,
} from '../services/data.service';

@Component({
  selector: 'app-home', // page name
  templateUrl: 'home.page.html', // page html
  styleUrls: ['home.page.scss'], // page style
})
export class HomePage implements OnInit {
  [x: string]: any;
  $event: any;

  ngOnInit() {
    this.getScreenSize();
  }

  checkScreenSize(): string {
    const screenWidth = window.innerWidth;
    const myScreen = screenWidth < 700 ? 'mobile' : 'desktop';
    return myScreen;
  }

  screenSize = this.checkScreenSize();

  getScreenSize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    console.log('Larghezza dello schermo: ' + screenWidth + 'px');
    console.log('Altezza dello schermo: ' + screenHeight + 'px');
  }

  openFirstMenu() {
    this.menuCtrl.open('first-menu');
  }

  AdminTables: Array<string> = [
    'Author',
    'Publisher',
    'Category',
    'Shopkeeper',
    'TypeObject',
    'Warehouse',
    'Provenance',
    'GeographicalOrigin',
  ];
  //-----------------  FILTERS  ------------------------
  availability: string = 'tutti'; // initial aviability filter checkbox
  searchInput: string | undefined | null = ''; // initial search input
  searchGeneres: Array<string> = []; // array for containing choosen generes
  searchYears = { lower: 1800, upper: 2024 }; // min and maximum years filter

  //----------------- Scelta della sezione ----------------------------

  isOpen: boolean = false;
  fileEvent: Event | undefined;

  //  //  //  //  //  //  //  //  //  //  //  //
  //  DATABASE INITIALIZATION

  allDatabase: Array<DatabaseObject> = [];
  filteredObjects: Array<DatabaseObject> = [];

  allCategories: Array<Category> = [];
  filteredCategories: Array<Category> = [];

  allWarehouses: Array<Warehouse> = [];
  filteredWarehouses: Array<Warehouse> = [];

  allPublishers: Array<Publisher> = [];
  filteredPublishers: Array<Publisher> = [];

  allGeographicalOrigins: Array<GeographicalOrigin> = [];
  filteredGeographicalOrigins: Array<GeographicalOrigin> = [];

  allTypeObjects: Array<TypeObject> = [];
  filteredTypeObjects: Array<TypeObject> = [];

  allShopkeepers: Array<Shopkeeper> = [];
  filteredShopkeepers: Array<Shopkeeper> = [];

  allProvenances: Array<Provenance> = [];
  filteredProvenances: Array<Provenance> = [];

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

  body_login: LoginObject = {
    username: '',
    password: '',
  };

  bodyAddCategory: Category = {
    categoryID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  //  //  //  //  //  //  //  //  //  //  //  //

  // PopOver
  showAddPopover: boolean = false;
  showModifyPopover: boolean = false;
  showDeletePopover: boolean = false;

  // VIEWS TO SHOW
  sectionToShow: string = 'Store'; // initial value = Store
  messageDismissModal: string = '';

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController
  ) {}

  @ViewChild('popover') popover: any;

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirmLogin() {
    this.modalCtrl.dismiss(this.body_login.username, 'confirm');
    console.log(this.body_login);
    PostRequest(baseURL + 'Login/', this.body_login);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.messageDismissModal = `Hello, ${this.body_login.username}!`;
    }
  }

  switchToView(value: string) {
    console.log('view BEFORE ', this.sectionToShow);
    this.sectionToShow = value;
    console.log('view AFTER ', this.sectionToShow);
  }

  promiseDatabase: Promise<DatabaseObject[]> | undefined = GetRequest(
    baseURL + 'GetObjects'
  ).then((res) => {
    console.log('Oggetti inviati dal database', res);
    this.allDatabase = res;
    console.log('Database degli Oggetti', this.allDatabase);

    return (this.filteredObjects = this.allDatabase);
  });

  promiseallWarehouses: Promise<Warehouse[]> | undefined = GetRequest(
    baseURL + 'GetWarehouses'
  ).then((res) => {
    console.log('Warehouse inviati dal database', res);
    return (this.allWarehouses = res);
  });

  promiseallPublishers: Promise<Publisher[]> | undefined = GetRequest(
    baseURL + 'GetPublishers'
  ).then((res) => {
    console.log('Publisher inviati dal database', res);
    return (this.allPublishers = res);
  });

  promiseallProvenances: Promise<Provenance[]> | undefined = GetRequest(
    baseURL + 'GetProvenances'
  ).then((res) => {
    console.log('Provenance inviati dal database', res);
    return (this.allProvenances = res);
  });

  promiseallGeographicalOrigins: Promise<GeographicalOrigin[]> | undefined =
    GetRequest(baseURL + 'GetGeographicalOrigins').then((res) => {
      console.log('GeographicalOrigin inviati dal database', res);
      return (this.allGeographicalOrigins = res);
    });

  promiseallTypeObjects: Promise<TypeObject[]> | undefined = GetRequest(
    baseURL + 'GetTypeObjects'
  ).then((res) => {
    console.log('TypeObject inviati dal database', res);
    return (this.allTypeObjects = res);
  });

  promiseallShopkeepers: Promise<Shopkeeper[]> | undefined = GetRequest(
    baseURL + 'GetShopkeepers'
  ).then((res) => {
    console.log('Shopkeeper inviati dal database', res);
    return (this.allShopkeepers = res);
  });

  promiseallCategories: Promise<Category[]> | undefined = GetRequest(
    baseURL + 'getCategories'
  ).then((res) => {
    console.log('Categorie inviati dal database', res);
    this.allCategories = res;
    return (this.filteredCategories = this.allCategories);
  });

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  setInput(input: string | undefined | null) {
    if (input !== undefined && input !== null) {
      this.searchInput = input;
    } else {
      this.searchInput = ''; // oppure this.searchInput = 'valore predefinito';
    }
  }

  getItems(input: string | undefined | null) {
    console.log('Filter Object results');
    // Get all the items from the database request
    // 1. get all the values from the database
    // 2. filter the database objects based on the search text
    this.filteredObjects = this.allDatabase;
    // if there is no search text give me every datapoint
    if (input == '' || input == null || input == undefined) {
      this.filteredObjects = this.filterByAvaiability(this.filteredObjects);
      this.filteredObjects = this.filterByYears(this.filteredObjects);
      this.filteredObjects = this.filterByGeneres(this.filteredObjects);
    } else {
      this.filteredObjects = this.allDatabase.filter((object) => {
        return object.title.toLowerCase().includes(input.toLowerCase());
      });
      this.filteredObjects = this.filterByAvaiability(this.filteredObjects);
      this.filteredObjects = this.filterByYears(this.filteredObjects);
      this.filteredObjects = this.filterByGeneres(this.filteredObjects);
    }
  }

  filterData(
    input: string | undefined | null,
    allData: any[],
    filterFunction: (data: any[]) => any[]
  ): any[] {
    let filteredData = allData;

    if (!input) {
      filteredData = filterFunction(filteredData);
    } else {
      const searchTerm = input.toLowerCase();
      filteredData = allData.filter((data) =>
        data.name.toLowerCase().includes(searchTerm)
      );
      filteredData = filterFunction(filteredData);
    }

    return filteredData;
  }

  getCategories(input: string | undefined | null) {
    this.filteredCategories = this.filterData(
      input,
      this.allCategories,
      this.filterByYears
    );
  }

  CreateCategory() {}

  ///////////////////////////////////////////////////////////////
  /////////////////       AUTORI      ///////////////////////////

  allAuthors: Array<Author> = [];
  filteredAuthors: Array<Author> = [];

  promiseallAuthors: Promise<Author[]> = GetRequest(
    baseURL + 'GetAuthors'
  ).then((res) => {
    console.log('Author inviati dal database', res);
    this.allAuthors = res;
    return (this.filteredAuthors = this.allAuthors);
  });

  bodyAddAuthor: Author = {
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
    this.filteredAuthors = this.filterData(
      input,
      this.allAuthors,
      this.filterByYears
    );
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
    this.bodyAddAuthor.authorID = this.getNewIDAuthor(this.allAuthors);
    let newAuthor = this.bodyAddAuthor;
    this.allAuthors.unshift(newAuthor);
    console.log('POST api/AddAuthor/ ', this.bodyAddAuthor);
    // Perform the PostRequest
    return PostRequest(baseURL + 'AddAuthor/', this.bodyAddAuthor)
      .then((response) => {
        // Reset bodyAddAuthor to null after the PostRequest
        this.bodyAddAuthor = {
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

  

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////

  getPublishers(input: string | undefined | null) {
    this.filteredProvenances = this.filterData(
      input,
      this.allProvenances,
      this.filterByYears
    );
  }

  filterByYears<T extends { addedDate: Date }>(filteredItems: T[]): T[] {
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

  updateItems(items: any[], itemToDelete: any, key: string) {
    items = items.filter((element) => element[key] !== itemToDelete[key]);
    return items;
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
