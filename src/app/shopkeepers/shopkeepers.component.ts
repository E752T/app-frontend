import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { baseURL } from '../enviroenment';
import { Shopkeeper } from '../services/interfaces.service';
import { PostRequest } from '../services/request.service';
import { DataService, today } from '../services/data.service';

@Component({
  selector: 'app-shopkeepers',
  templateUrl: './shopkeepers.component.html',
  styleUrls: ['./../app.component.scss','./shopkeepers.component.scss'],
})
export class ShopkeepersComponent {
  private platform = inject(Platform);
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
  shopkeeper!: Shopkeeper;

  @Input()
  shopkeepers!: Array<Shopkeeper>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updateShopkeepers = new EventEmitter<any>();

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

  body_update_shopkeeper: Shopkeeper = {
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

  DeleteElement(objectID: any) {
    this.shopkeepers = this.shopkeepers.filter(
      (element: Shopkeeper) => element.shopkeeperID !== objectID
    );
    this.updateShopkeepers.emit(this.shopkeepers);
    this.modalCtrl.dismiss({ confirmed: true });
    return PostRequest(baseURL + 'DeleteShopkeeper/' + objectID);
  }


  UpdateElement(): Promise<any> {
    return PostRequest(baseURL + 'UpdateShopkeeper/', this.shopkeeper);
  }

  cancel() {
    this.modalCtrl.dismiss({ confirmed: false });
  }
}
