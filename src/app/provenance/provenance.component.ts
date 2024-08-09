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

import { PostRequest } from '../services/request.service';
import { baseURL, today } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { Provenance } from '../services/interfaces.service';

@Component({
  selector: 'app-provenances',
  templateUrl: './provenance.component.html',
  styleUrls: ['./provenance.component.scss'],
})
export class ProvenancesComponent {
  private platform = inject(Platform);
  constructor(private http: HttpClient, private modalCtrl: ModalController) {}

  @Input()
  provenance!: Provenance;

  @Input()
  provenances!: Array<Provenance>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updateProvenances = new EventEmitter<any>();

  @ViewChild(IonModal)
  modal!: IonModal;

  body_add_provenance: Provenance = {
    provenanceID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  body_update_provenance: Provenance = {
    provenanceID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  DeleteElement(objectID: any) {
    this.provenances = this.provenances.filter(
      (element: Provenance) => element.provenanceID !== objectID
    );
    console.log('API DeleteProvenance/ -> Remaining Array ', this.provenances);
    this.updateProvenances.emit(this.provenances);
    this.modalCtrl.dismiss({ confirmed: true });
    return PostRequest(baseURL + 'DeleteProvenance/' + objectID);
  }

  getNewID(elementList: Array<Provenance>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].provenanceID > highestID) {
        highestID = elementList[i].provenanceID;
      }
    }
    return highestID + 1;
  }

  UpdateElement(): Promise<any> {
    console.log('POST api/UpdateProvenance/ ', this.provenance);
    return PostRequest(baseURL + 'UpdateProvenance/', this.provenance);
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
