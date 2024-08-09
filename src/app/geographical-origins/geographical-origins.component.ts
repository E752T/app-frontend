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
import { today } from '../services/data.service';

@Component({
  selector: 'app-geographical-origin',
  templateUrl: './geographical-origins.component.html',
  styleUrls: ['./geographical-origins.component.scss'],
})
export class GeographicalOriginComponent {
  constructor(
    private http: HttpClient,
    private modalController: ModalController
  ) {}

  private platform = inject(Platform);

  @Input()
  geographical_origin!: GeographicalOrigin;

  @Input()
  geographical_origins!: Array<GeographicalOrigin>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updatePublishers = new EventEmitter<any>();

  @ViewChild(IonModal)
  modal!: IonModal;

  modalCtrl: any;

  bodyAddGeographicalOrigin: GeographicalOrigin = {
    geographicalOriginID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  bodyModifyGeographicalOrigin: GeographicalOrigin = {
    geographicalOriginID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

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
