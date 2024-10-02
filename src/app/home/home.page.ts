//////////////////////////////////////////////////////////////
//////////// LIBRERIE ESTERNE ////////////////////////////////
//////////////////////////////////////////////////////////////

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ModalController,
  RefresherCustomEvent,
  ToastController,
} from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

//////////////////////////////////////////////////////////////
//////////// LIBRERIE DEL PROGETTO ///////////////////////////
//////////////////////////////////////////////////////////////

import { GetRequest, PostRequest } from '../services/request.service';
import { DataService, today } from '../services/data.service';

import {
  DatabaseObject,
  Author,
  Category,
  Publisher,
  Shopkeeper,
  Provenance,
  GeographicalOrigin,
  Warehouse,
  TypeObject,
  User,
} from '../services/interfaces.service';

import { baseURL } from '../enviroenment';

@Component({
  selector: 'app-home', // page name
  templateUrl: 'home.page.html', // page html
  styleUrls: ['./../app.component.scss', 'home.page.scss'], // page style
})
export class HomePage implements OnInit {
  //////////////////////////////////////////////////////////////
  //////////// VARIABILI DEL PROGETTO //////////////////////////
  //////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
  ////  FILTRI DI RICERCA   /////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////

  availability: string = 'tutti'; // initial aviability filter checkbox
  searchInput: string | undefined | null = ''; // initial search input
  searchGeneres: Array<string> = []; // array for containing choosen generes
  searchYears = { lower: 1800, upper: 2024 }; // min and maximum years filter

  ///////////////////////////////////////////////////////////////////
  //// MENU ANCORATO ////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////

  // dimensione della colonna del menuAncorato
  // dove sono presenti i filtri, i bottoni di Assistenza, Account e LogOut
  // default: 0 Dimensione predefinita, poichè inizialmente sia su Desktop che su Mobile
  // solo il menù volante è attivato, al click del bottone con ancora
  // il valore viene cambiato da 0 a 4, così il menù ancorato diventa fisso nella pagina
  sizeColumnFilter: string = '0';
  // variabile che definisce se il menù deve essere ancorato
  // il valore di default: true per iniziare con il menù non ancorato
  isMenuAnchored: boolean = true;

  ///////////////////////////////////////////////////////////////////
  //// CATEGORIE DELL'APPLICAZIONE //////////////////////////////////
  ///////////////////////////////////////////////////////////////////

  AdminTables: Array<string> = [
    'Author',
    'Publisher',
    'Category',
    'Shopkeeper',
    'Warehouse',
    'Provenance',
    'GeographicalOrigin',
    'TypeObject',
  ];

  ///////////////////////////////////////////////////////////////////
  //// CONTENITORE VUOTO DELL'USER //////////////////////////////////
  ///////////////////////////////////////////////////////////////////

  user: User = {
    admin: 0,
    description: '',
    userID: 0,
    addedDate: new Date(),
    lastUpdateDate: new Date(),
    notes: '',
    password: '',
    shopkeeperID: 0,
    telephone1: '',
    telephone2: '',
    username: '',
    email: '',
    shopkeeper: '',
  };

  ///////////////////////////////////////////////////////////////////
  //// CRITTOGRAFIA  ////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////

  // chiave di crittografia per l'applicazione
  key: string =
    'PidGCxd0zOp8eu4ou1uOtrgwVYAoztSmU164JLSW1OaaCyfi6AyhzpxJLTck9uVx';

  private encrypt(txt: string): string {
    // funzione per crittografare il testo con AES
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    // funzione per decriptare il testo con AES
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(
      CryptoJS.enc.Utf8
    );
  }

  public saveData(key: string, value: string) {
    // funzione per salvare il testo con crittografia su localStorage
    localStorage.setItem(key, this.encrypt(value));
  }

  public getData(key: string) {
    // funzione per prendere il testo con crittografia da localStorage e decriptarlo
    let data = localStorage.getItem(key) || '';
    return this.decrypt(data);
  }

  public clearData() {
    // funzione per eliminare il testo da localStorage
    localStorage.clear();
  }
  

  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////
  current_user: any;
  imageAvatar: any;
  new_shopkeeper: any;
  new_username: any;
  new_password: any;
  new_email: any;
  bodyAddObject: any;

  allDatabase: DatabaseObject[] = [];
  filteredObjects: DatabaseObject[] = [];

  imageUrl: string | ArrayBuffer | null = null;

  public token_JWT: string | null;
  public user_role: string | null;
  public token_JWT_success: boolean | null;
  public username: string | null;

  public body_login: {
    shopkeeper: string | null;
    email: string | null;
    password: string | null;
    username: string | null;
  } = {
    shopkeeper: '',
    email: '',
    password: '',
    username: '',
  };

  async ngOnInit() {
    this.getScreenSize();
    this.toggleMenu();

    this.current_user = this.dataService.getCurrentUser();
    console.log('This current user ', this.current_user);

    this.dataService.getAllDatabase().subscribe((data: DatabaseObject[]) => {
      this.allDatabase = data;
      this.filteredObjects = this.allDatabase; // Filtrare gli oggetti se necessario
      console.log(
        'Database caricato con successo dentro Home:',
        this.allDatabase
      );
      this.cdr.detectChanges(); // Attivare manualmente il rilevamento delle modifiche
    });
  }

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private menuCtrl: MenuController,
    private router: Router,
    private dataService: DataService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
    this.token_JWT = this.dataService.getTokenJWT();
    this.user_role = this.dataService.getUserRole();
    this.username = this.dataService.getUsername();
    this.token_JWT_success = this.dataService.getTokenJWTsuccess();
    this.body_login = this.dataService.getBodyLogin();
    this.bodyAddObject = this.dataService.getBodyAddObject();

    localStorage.clear();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // FRONTEND VARIABLES
  isOpen: boolean = false;

  // VIEWS TO SHOW
  sectionToShow: string = 'Store'; // initial value = Store
  messageDismissModal: string = '';

  // FRONTEND FUNCTIONS
  @ViewChild('menuAncora', { static: false }) menuAncora:
    | ElementRef
    | undefined;
  @ViewChild('grigliaElementi', { static: false }) grigliaElementi:
    | ElementRef
    | undefined;

  screenSize = this.checkScreenSize();

  logOut() {
    console.log('Log out in corso...');
    // elimina tutte le variabili trattenute nel localStorage
    localStorage.setItem('token_JWT', '');
    localStorage.setItem('token_JWT_success', '');
    localStorage.setItem('shopkeeper', '');
    localStorage.setItem('email', '');
    localStorage.setItem('password', '');
    localStorage.setItem('username', '');
    localStorage.setItem('user_role', '');

    setTimeout(() => {
      this.cancel();
      this.router.navigate(['/login']); // Reindirizza alla pagina di login
    }, 2200);
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

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.messageDismissModal = `Ciao ${this.username}!`;
    }
  }

  switchToView(value: string) {
    //console.log('switchToView() | view before ', this.sectionToShow);
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
    //console.log('switchToView() | view after ', this.sectionToShow);
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  getItems(input: string | undefined | null) {
    //console.log('Filter Object results');
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

  getItemById(id: number): DatabaseObject {
    const item = this.allDatabase.find((item) => item.objectID === id);
    if (!item) {
      throw new Error(`Oggetto con ID ${id} non trovato.`);
    }
    return item;
  }

  // AUTORI
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
    //console.log('Filter results of getAuthors() => ', this.allAuthors);
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

    this.cancel();
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
        throw error;
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

  // Category

  allCategories: Array<Category> = [];
  filteredCategories: Array<Category> = [];

  promiseallCategories: Promise<Category[]> = GetRequest(
    baseURL + 'GetCategories'
  ).then((res) => {
    console.log('Category inviati dal database', res);
    this.allCategories = res;
    this.dataService.setCategories(this.allCategories); // Imposta le categorie nel servizio
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
    //console.log('results of getCategories() => ', this.filteredCategories);
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
    this.cancel();

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

  // Publisher

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
    //console.log('Filter results of getPublishers() => ',this.filteredPublishers);
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
    this.cancel();

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

  // ESERCENTI

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
    //console.log('Filter results of getShopkeepers() => ', this.filteredShopkeepers);
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
    this.cancel();

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

  // MAGAZZINI

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
    //console.log('Filter results of getWarehouses() => ',this.filteredWarehouses);
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
    this.cancel();

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

  // PROVENIENZE

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
    //console.log('Filter results of getProvenances() => ',this.filteredProvenances);
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
    this.cancel();

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
    //console.log('Filter results of getGeographicalOrigins() => ',this.filteredGeographicalOrigins);
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
    this.cancel();

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

  // TIPI DI OGGETTI

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
    //console.log('Filter results of getTypeObjects() => ',this.filteredTypeObjects);
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
    this.cancel();

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

  /////////////////////////////////////////////////////////////
  ////////////   FILTRI DI RICERCA   //////////////////////////
  /////////////////////////////////////////////////////////////

  setInput(input: string | undefined | null) {
    // prendi il valore testuale inserito nella barra di ricerca
    // ed associalo a searchInput per poterlo usare come filtro
    // cambia questo valore ad ogni cambiamento del contenuto della barra di ricerca

    if (input !== undefined && input !== null) {
      this.searchInput = input;
    } else {
      this.searchInput = ''; // oppure this.searchInput = 'valore predefinito';
    }
  }

  filterByYears<T extends { addedDate: Date }>(filteredItems: T[]): T[] {
    // filtra gli elementi per il range di anni selezionati
    // questa funzione lavora su tutte le categorie disponibili:
    // quindi: esercenti, provenienza, origine etc... (tranne gli oggetti)

    // item.discoveryDate: data di scoperta dell oggetto
    // searchYears.lower: valore più basso del range di anni
    // searchYears.upper: valore più alto del range di anni

    // prende tutti gli oggetti e ritorna solamente quelli la cui
    // data di aggiunta (item.addedDate) espressa in anni,
    // è compresa fra il range degli anni selezionato, ovvero è
    // compresa fra searchYears.lower ed searchYears.upper

    //console.log(" filter by years ",this.searchYears.lower, this.searchYears.upper);
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
    // filtra gli oggetti per il range di anni selezionati
    // item.discoveryDate: data di scoperta dell oggetto
    // searchYears.lower: valore più basso del range di anni
    // searchYears.upper: valore più alto del range di anni

    // prende tutti gli oggetti e ritorna solamente quelli la cui
    // data di scoperta (item.discoveryDate) espressa in anni,
    // è compresa fra il range degli anni selezionato, ovvero è
    // compresa fra searchYears.lower ed searchYears.upper

    // inizializza un vettore vuoto di oggetti
    filteredItems: T[]
  ): T[] {
    //console.log("Filtri degli anni impostato su :",this.searchYears.lower," | ", this.searchYears.upper);
    return filteredItems.filter((item) => {
      if (item.discoveryDate != null) {
        // estrai l'anno di scoperta dell'oggetto
        const year = new Date(item.discoveryDate).getFullYear();
        // estrai l'anno del range più basso
        const lowerYear = Number.isNaN(this.searchYears.lower)
          ? 1800
          : this.searchYears.lower;
        // estrai l'anno del range più alto
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
    // filtra gli oggetti per la disponibilià

    // inizializza i risultati filtrati come un vettore vuoto
    var result: DatabaseObject[] = filteredObjects;

    // availability: variabile selezionata, controlla se prendere
    // solo gli oggetti disponibili o tutti gli oggetti
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
    // filtra gli oggetti per i generi selezionati
    // la variabile searchGeneres è per i generi selezionati da trovare
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

  async showToast(message: string, color: string) {
    // Mantieni questa classe per la personalizzazione
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 3000,
      cssClass: 'toast-elemento',
    });
    await toast.present();
  }

  async updateCredentials() {
    // prendi da dataService le credenziali attuali
    let current_user = this.dataService.getCurrentUser();

    // converti i valori del Profilo Amministratore dentro la modale
    // per cambiare i valori da true/false a 0 e 1, dove 1 = admin e 0 = user
    if (this.current_user.admin == true) {
      this.current_user.admin = 1;
    } else {
      this.current_user.admin = 0;
    }

    console.log('UpdateCredentials | new credentials = ', current_user);

    // manda al server le nuove credenziali
    let response = await PostRequest(
      baseURL + 'UpdateCredentials/',
      this.current_user
    );
    setTimeout(() => {
      this.showToast("Uscita dall'account", 'primary');
      this.logOut(), console.log("Uscita dall' account");
    }, 1500);
  }
}
