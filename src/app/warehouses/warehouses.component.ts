import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { baseURL } from '../enviroenment';
import { DataService, today } from '../services/data.service';
import { PostRequest } from '../services/request.service';
import { Warehouse } from '../services/interfaces.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./../app.component.scss'],
})
export class WarehouseComponent {
  public token_JWT: string | null;
  public user_role: string | null;
  public token_JWT_success: boolean | null;
  public username: string | null = localStorage.getItem('username');

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
  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService
  ) {
    this.token_JWT = this.dataService.getTokenJWT();
    this.user_role = this.dataService.getUserRole();
    this.username = this.dataService.getUsername();
    this.token_JWT_success = this.dataService.getTokenJWTsuccess();
    this.body_login = this.dataService.getBodyLogin();
  }

  @Input()
  warehouse!: Warehouse;

  @Input()
  warehouses!: Array<Warehouse>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updateWarehouses = new EventEmitter<any>();

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

  DeleteElement(objectID: any) {
    this.warehouses.filter(
      (element: Warehouse) => element.warehouseID !== objectID
    );
    this.updateWarehouses.emit(this.warehouses);
    this.modalCtrl.dismiss({ confirmed: true });
    return PostRequest(baseURL + 'DeleteWarehouse/' + objectID);
  }

  UpdateElement(): Promise<any> {
    return PostRequest(baseURL + 'UpdateWarehouse/', this.warehouse);
  }

  getNewID(elementList: Array<Warehouse>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].warehouseID > highestID) {
        highestID = elementList[i].warehouseID;
      }
    }
    return highestID + 1;
  }

  cancel() {
    this.modalCtrl.dismiss({ confirmed: false });
  }
}
