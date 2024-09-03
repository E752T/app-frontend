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
  private platform = inject(Platform);
  constructor(private http: HttpClient, private modalCtrl: ModalController) {}

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

  DeleteElement(typeID: any) {
    this.type_objects = this.type_objects.filter(
      (element: TypeObject) => element.typeID !== typeID
    );
    this.updateTypeObject.emit(this.type_objects);
    this.modalCtrl.dismiss({ confirmed: true });
    console.log("DeleteTypeObject ", this.type_objects)
    return PostRequest(baseURL + 'DeleteTypeObject/' + typeID);
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

  UpdateElement(): Promise<any> {
    console.log('Update Type Objects');
    return PostRequest(baseURL + 'UpdateTypeObject/', this.type_object);
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
