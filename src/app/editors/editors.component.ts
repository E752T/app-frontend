import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { baseURL } from '../enviroenment';
import { DataService, today } from '../services/data.service';
import { PostRequest } from '../services/request.service';
import { Publisher } from '../services/data.service';

@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./../app.component.scss', './editors.component.scss'],
})
export class EditorsComponent {
  public token_JWT: string | null;
  public user_role: string | null;
  public token_JWT_success: boolean | null;
  public username: string | null = localStorage.getItem('username');
  public body_login: any;

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
  publisher!: Publisher;

  @Input()
  publishers!: Array<Publisher>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updatePublishers = new EventEmitter<any>();

  body_add_publisher = this.dataService.body_add_publisher;
  body_update_publisher = this.dataService.body_update_publisher;

  DeleteElement(objectID: any) {
    this.publishers.filter(
      (element: Publisher) => element.publisherID !== objectID
    );
    var elementToDelete = console.log(this.publishers);
    this.updatePublishers.emit(elementToDelete);
    this.modalCtrl.dismiss({ confirmed: true });
    return PostRequest(baseURL + 'DeletePublisher/' + objectID);
  }

  UpdateElement(): Promise<any> {
    return PostRequest(baseURL + 'UpdatePublisher/', this.publisher);
  }

  cancel() {
    this.modalCtrl.dismiss({ confirmed: false });
  }
}
