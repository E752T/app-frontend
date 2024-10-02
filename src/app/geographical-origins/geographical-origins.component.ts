import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeographicalOrigin } from '../services/interfaces.service';
import { DataService, today } from '../services/data.service';
import { PostRequest } from '../services/request.service';
import { baseURL } from '../enviroenment';

@Component({
  selector: 'app-geographical-origin',
  templateUrl: './geographical-origins.component.html',
  styleUrls: [
    './../app.component.scss',
    './geographical-origins.component.scss',
  ],
})
export class GeographicalOriginComponent {
  public token_JWT: string | null;
  public user_role: string | null;
  public token_JWT_success: boolean | null;
  public username: string | null = localStorage.getItem('username');

  public body_login: {
    shopkeeper: string | null;
    email: string | null;
    password: string | null;
    username: string | null;
  } = {
    shopkeeper: '',
    email: '',
    password: '',
    username: '',
  };
  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService
  ) {
    this.token_JWT = this.dataService.getTokenJWT();
    this.user_role = this.dataService.getUserRole();
    this.username = this.dataService.getUsername();
    this.token_JWT_success = this.dataService.getTokenJWTsuccess();
    this.body_login = this.dataService.getBodyLogin();
  }

  @Input()
  geographical_origin!: GeographicalOrigin;

  @Input()
  geographical_origins!: Array<GeographicalOrigin>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updateGeographicalOrigins = new EventEmitter<any>();

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
    this.updateGeographicalOrigins.emit(this.geographical_origins);
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

  cancel() {
    this.modalCtrl.dismiss({ confirmed: false });
  }
}
