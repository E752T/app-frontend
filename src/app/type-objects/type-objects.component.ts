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
import { HttpClient } from '@angular/common/http';
import { TypeObject } from '../services/interfaces.service';

@Component({
  selector: 'app-type-objects',
  templateUrl: './type-objects.component.html',
  styleUrls: ['./type-objects.component.scss'],
})
export class TypeObjectComponent {
  // Adjusted class name with the "Component" suffix
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
  updateTypeObject = new EventEmitter<any>();

  @ViewChild(IonModal)
  modal!: IonModal;

  modalCtrl: any;

  body_add_type_object: TypeObject = {
    typeID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  body_update_type_object: TypeObject = {
    typeID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  DeleteElement(objectID: any) {
    this.type_objects.filter(
      (element: TypeObject) => element.typeID !== objectID
    );
    var elementToDelete = console.log(this.type_objects);
    this.updateTypeObject.emit(elementToDelete);
    this.modalCtrl.dismiss({ confirmed: true });
    return PostRequest(baseURL + 'DeleteTypeObject/' + objectID);
  }

  confirmDeleteElement() {
    this.DeleteElement(this.type_object?.typeID);
    this.modalCtrl.dismiss({ confirmed: true });
  }

  UpdateElement(): Promise<any> {
    console.log('UpdateTypeObject/', this.type_object)
    return PostRequest(baseURL + 'UpdateTypeObject/', this.type_object);
  }

  getNewID(elementList: Array<TypeObject>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].typeID > highestID) {
        highestID = elementList[i].typeID;
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
