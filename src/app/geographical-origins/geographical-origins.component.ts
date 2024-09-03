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
import { HttpClient } from '@angular/common/http';
import { OverlayEventDetail } from '@ionic/core';

import { GeographicalOrigin } from '../services/interfaces.service';
import { baseURL, today } from '../services/data.service';
import { PostRequest } from '../services/request.service';

@Component({
  selector: 'app-geographical-origin',
  templateUrl: './geographical-origins.component.html',
  styleUrls: ['./geographical-origins.component.scss'],
})
export class GeographicalOriginComponent {
  constructor(private http: HttpClient, private modalCtrl: ModalController) {}

  private platform = inject(Platform);

  @Input()
  geographical_origin!: GeographicalOrigin;

  @Input()
  geographical_origins!: Array<GeographicalOrigin>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updateGeographicalOrigin = new EventEmitter<any>();

  @ViewChild(IonModal)
  modal!: IonModal;

  body_add_geographical_origin: GeographicalOrigin = {
    geographicalOriginID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  body_update_geographical_origin: GeographicalOrigin = {
    geographicalOriginID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  DeleteElement(objectID: any) {
    this.geographical_origins = this.geographical_origins.filter(
      (element: GeographicalOrigin) => element.geographicalOriginID !== objectID
    );
    this.updateGeographicalOrigin.emit(this.geographical_origins);
    this.modalCtrl.dismiss({ confirmed: true });
    return PostRequest(baseURL + 'DeleteGeographicalOrigin/' + objectID);
  }

  getNewID(elementList: Array<GeographicalOrigin>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].geographicalOriginID > highestID) {
        highestID = elementList[i].geographicalOriginID;
      }
    }
    return highestID + 1;
  }

  UpdateElement(): Promise<any> {
    console.log(
      'POST api/UpdateGeographicalOrigin/ ',
      this.geographical_origin
    );
    return PostRequest(
      baseURL + 'UpdateGeographicalOrigin/',
      this.geographical_origin
    );
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
