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
    if (key == 'shopkeeperID') {
      const foundObject = array.find((obj) => obj.uniqueName === name);
      return foundObject ? foundObject[key] : null;
    } else {
      const foundObject = array.find((obj) => obj.name === name);
      return foundObject ? foundObject[key] : null;
    }
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

  // Publisher
  public CreatePublisher(): Promise<any> {
    this.dataService.body_add_publisher.publisherID = this.getNewID(
      this.dataService.getPublishers(),
      'publisherID'
    );

    this.dataService.addPublisher(this.dataService.body_add_publisher);

    return PostRequest(
      baseURL + 'AddPublisher/',
      this.dataService.body_add_publisher
    )
      .then((response) => {
        this.reset_body_add_publisher();
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error;
      });
  }

  private reset_body_add_publisher(): void {
    this.dataService.body_add_publisher = {
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
  }

  // Shopkeeper
  public CreateShopkeeper(): Promise<any> {
    this.dataService.body_add_shopkeeper.shopkeeperID = this.getNewID(
      this.dataService.getShopkeepers(),
      'shopkeeperID'
    );

    this.dataService.addShopkeeper(this.dataService.body_add_shopkeeper);

    return PostRequest(
      baseURL + 'AddShopkeeper/',
      this.dataService.body_add_shopkeeper
    )
      .then((response) => {
        this.reset_body_add_shopkeeper();
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error;
      });
  }

  private reset_body_add_shopkeeper(): void {
    this.dataService.body_add_shopkeeper = {
      shopkeeperID: 0,
      uniqueName: '',
      addedDate: today,
      lastUpdateDate: today,
      description: '',
      email: '',
      telephone1: '',
      telephone2: '',
      notes: '',
    };
  }

  // Type Objects
  public CreateType(): Promise<any> {
    this.dataService.body_add_type_object.typeID = this.getNewID(
      this.dataService.getTypeObjects(),
      'typeID'
    );

    this.dataService.addTypeObject(this.dataService.body_add_type_object);

    return PostRequest(
      baseURL + 'AddType/',
      this.dataService.body_add_type_object
    )
      .then((response) => {
        this.reset_body_add_type_object();
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error;
      });
  }

  private reset_body_add_type_object(): void {
    this.dataService.body_add_type_object = {
      typeID: 0,
      name: '',
      addedDate: today,
      lastUpdateDate: today,
      description: '',
    };
  }

  // Warehouse
  public CreateWarehouse(): Promise<any> {
    this.dataService.body_add_warehouse.warehouseID = this.getNewID(
      this.dataService.getWarehouses(),
      'warehouseID'
    );

    this.dataService.addWarehouse(this.dataService.body_add_warehouse);

    return PostRequest(
      baseURL + 'AddWarehouse/',
      this.dataService.body_add_warehouse
    )
      .then((response) => {
        this.reset_body_add_warehouse();
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error;
      });
  }

  private reset_body_add_warehouse(): void {
    this.dataService.body_add_warehouse = {
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
  }

  // Provenance
  public CreateProvenance(): Promise<any> {
    this.dataService.body_add_provenance.provenanceID = this.getNewID(
      this.dataService.getProvenances(),
      'provenanceID'
    );

    this.dataService.addProvenance(this.dataService.body_add_provenance);

    return PostRequest(
      baseURL + 'AddProvenance/',
      this.dataService.body_add_provenance
    )
      .then((response) => {
        this.reset_body_add_provenance();
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error;
      });
  }

  private reset_body_add_provenance(): void {
    this.dataService.body_add_provenance = {
      provenanceID: 0,
      name: '',
      addedDate: today,
      lastUpdateDate: today,
      description: '',
    };
  }

  // GeographicalOrigin
  public CreateOrigin(): Promise<any> {
    this.dataService.body_add_geographical_origin.geographicalOriginID =
      this.getNewID(
        this.dataService.getGeographicalOrigins(),
        'geographicalOriginID'
      );

    this.dataService.addGeographicalOrigin(
      this.dataService.body_add_geographical_origin
    );

    return PostRequest(
      baseURL + 'AddGeographicalOrigin/',
      this.dataService.body_add_geographical_origin
    )
      .then((response) => {
        this.reset_body_add_geographical_origin();
        return response;
      })
      .catch((error) => {
        console.error('Error in PostRequest: ', error);
        throw error;
      });
  }

  private reset_body_add_geographical_origin(): void {
    this.dataService.body_add_geographical_origin = {
      geographicalOriginID: 0,
      name: '',
      addedDate: today,
      lastUpdateDate: today,
      description: '',
    };
  }
}
