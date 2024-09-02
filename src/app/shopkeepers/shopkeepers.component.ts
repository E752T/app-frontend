import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { Shopkeeper } from '../services/interfaces.service';
import { PostRequest } from '../services/request.service';
import { baseURL, today } from '../services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shopkeepers',
  templateUrl: './shopkeepers.component.html',
  styleUrls: ['./shopkeepers.component.scss'],
})
export class ShopkeepersComponent {
  private platform = inject(Platform);
  constructor(private http: HttpClient, private modalCtrl: ModalController) {}

  @Input()
  shopkeeper!: Shopkeeper;

  @Input()
  shopkeepers!: Array<Shopkeeper>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updateShopkeepers = new EventEmitter<any>();

  @ViewChild(IonModal)
  modal!: IonModal;

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

  getNewID(elementList: Array<Shopkeeper>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].shopkeeperID > highestID) {
        highestID = elementList[i].shopkeeperID;
      }
    }
    return highestID + 1;
  }

  UpdateElement(): Promise<any> {
    return PostRequest(baseURL + 'UpdateShopkeeper/', this.shopkeeper);
  }

  confirm() {
    this.modalCtrl.dismiss({ confirmed: true });
  }

  cancel() {
    this.modalCtrl.dismiss({ confirmed: false });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }
}
