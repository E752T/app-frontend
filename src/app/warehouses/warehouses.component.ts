import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { OverlayEventDetail } from '@ionic/core';

import { baseURL, today } from '../services/data.service';
import { PostRequest } from '../services/request.service';
import { Warehouse } from '../services/interfaces.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss'],
})
export class WarehouseComponent {
  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController
  ) {}

  private platform = inject(Platform);

  @Input()
  warehouse!: Warehouse;

  @Input()
  warehouses!: Array<Warehouse>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updateWarehouses = new EventEmitter<any>();

  @ViewChild(IonModal)
  modal!: IonModal;

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

  confirmDeleteElement() {
    this.DeleteElement(this.warehouse?.warehouseID);
    this.modalCtrl.dismiss({ confirmed: true });
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
