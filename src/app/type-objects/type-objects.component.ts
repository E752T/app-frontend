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
import { TypeObject } from '../services/interfaces.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shopkeepers',
  templateUrl: './type-objects.component.html',
  styleUrls: ['./type-objects.component.scss'],
})
export class TypeObject {

  constructor(
    private http: HttpClient,
    private modalController: ModalController
  ) {}

  private platform = inject(Platform);

  @Input()
  type_object!: TypeObject;

  @Input()
  type_objects!: Array<TypeObject>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updateTypeObjects = new EventEmitter<any>();

  @ViewChild(IonModal)
  modal!: IonModal;

  modalCtrl: any;

  bodyAddShopkeeper: TypeObject = {
    typeID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  bodyModifyShopkeeper: TypeObject = {
    typeID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  ////////////////////////////////////////////////

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
