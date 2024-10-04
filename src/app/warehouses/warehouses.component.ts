import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { baseURL } from '../enviroenment';
import { DataService, today } from '../services/data.service';
import { PostRequest } from '../services/request.service';
import { Warehouse } from '../services/data.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./../app.component.scss', './warehouses.component.scss'],
})
export class WarehouseComponent {
  public token_JWT: string | null;
  public user_role: string | null;
  public token_JWT_success: boolean | null;
  public username: string | null = localStorage.getItem('username');
  public body_login: any;

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

  body_add_warehouse = this.dataService.body_add_warehouse;
  body_update_warehouse = this.dataService.body_update_warehouse;

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

  cancel() {
    this.modalCtrl.dismiss({ confirmed: false });
  }
}
