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
  LoginObject,
} from '../services/interfaces.service';

export let baseURL: string = 'http://localhost:5269/api/BookStore/';

export const today: Date = new Date();

import { DatePipe } from '@angular/common';
const datePipe = new DatePipe('en-US');
const formattedDate = datePipe.transform(today, 'yyyy-MM-dd');


export let messageDismissModal: string = '';

export const alertButtons = ['OK'];
export const saveButtons = ['OK'];
export const modifyButtons = ['OK'];
export const filterButtons = ['OK'];
export const isOpen: boolean = false;

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
};

export let bodyModifyShopkeeper: Shopkeeper = {
  shopkeeperID: 0,
  addedDate: new Date(),
  lastUpdateDate: new Date(),
  uniqueName: '',
  description: '',
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
