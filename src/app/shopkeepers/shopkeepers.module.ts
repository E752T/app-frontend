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

import {  today } from '../services/data.service';
import { Shopkeeper } from '../services/interfaces.service';

@Component({
  selector: 'app-shopkeepers',
  templateUrl: './shopkeepers.component.html',
  styleUrls: ['./shopkeepers.component.scss'],
})
export class ShopkeepersComponent {
  [x: string]: any;

  constructor(
    private http: HttpClient,
    private modalController: ModalController
  ) {}

  private platform = inject(Platform);

  @Input()
  shopkeeper!:  Shopkeeper;

  @Input()
  shopkeepers!: Array<Shopkeeper>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updatePublishers = new EventEmitter<any>();

  @ViewChild(IonModal)
  modal!: IonModal;

  modalCtrl: any;

  body_add_shopkeeper: Shopkeeper = {
    shopkeeperID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  body_update_shopkeeper: Shopkeeper = {
    shopkeeperID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };
}