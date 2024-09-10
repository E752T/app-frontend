// object element names & data types

export interface LoginObject {
  email: string;
  password: string;
  shopkeeper: string;
  username: string;
  //twoFactorCode: string;
  //twoFactorRecoveryCode: string;
}

export interface DatabaseObject {
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
