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
import { OverlayEventDetail } from '@ionic/core';

import { baseURL, today } from '../services/data.service';
import { PostRequest } from '../services/request.service';
import { Publisher } from '../services/interfaces.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.scss'],
})
export class EditorsComponent {

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController
  ) {}


  @Input()
  publisher!: Publisher;

  @Input()
  publishers!: Array<Publisher>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updatePublishers = new EventEmitter<any>();

  @ViewChild(IonModal)
  modal!: IonModal;

  body_add_publisher: Publisher = {
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

  body_update_publisher: Publisher = {
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

  DeleteElement(objectID: any) {
    this.publishers.filter(
      (element: Publisher) => element.publisherID !== objectID
    );
    var elementToDelete = console.log(this.publishers);
    this.updatePublishers.emit(elementToDelete);
    this.modalCtrl.dismiss({ confirmed: true });
    return PostRequest(baseURL + 'DeletePublisher/' + objectID);
  }

  confirmDelete() {
    this.DeleteElement(this.publisher?.publisherID);
    this.modalCtrl.dismiss({ confirmed: true });
  }

  UpdateElement(): Promise<any> {
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
    this.modalCtrl.dismiss({ confirmed: true });
  }

  cancel() {
    this.modalCtrl.dismiss({ confirmed: false });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }
}
