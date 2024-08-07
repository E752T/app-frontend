import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { baseURL, today } from '../services/data.service';
import { PostRequest } from '../services/request.service';
import { OverlayEventDetail } from '@ionic/core';
import { Warehouse } from '../services/interfaces.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss'],
})
export class WarehouseComponent {
  constructor(
    private http: HttpClient,
    private modalController: ModalController
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

  modalCtrl: any;

  bodyAddPublisher: Warehouse = {
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

  bodyModifyPublisher: Warehouse = {
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

  ////////////////////////////////

  DeleteElement(objectID: any) {
    this.publishers.filter(
      (element: Publisher) => element.publisherID !== objectID
    );
    var elementToDelete = console.log(this.publishers);
    this.updatePublishers.emit(elementToDelete);
    return PostRequest(baseURL + 'DeleteCategory/' + objectID);
  }

  confirmDeleteElement() {
    this.DeleteElement(this.publisher?.publisherID);
    this.modalCtrl.dismiss({ confirmed: true });
  }

  UpdateAPI(): Promise<any> {
    return PostRequest(baseURL + 'UpdatePublisher/', this.publisher);
  }

  getNewID(elementList: Array<Publisher>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].publisherID > highestID) {
        highestID = elementList[i].publisherID;
      }
    }
    return highestID + 1;
  }

  confirm() {
    this.modalController.dismiss({ confirmed: true });
  }

  cancel() {
    this.modalController.dismiss({ confirmed: false });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }
}
