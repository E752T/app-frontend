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

import { Author } from '../services/interfaces.service';
import { PostRequest } from '../services/request.service';
import { DataService, today } from '../services/data.service';
import { baseURL } from '../enviroenment';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent {
  private platform = inject(Platform);

  // public token_JWT: string;
  // public user_role: string;
  // public username: string | null;
  // public token_JWT_success: boolean;

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
    // this.username = this.dataService.getUsername();
    // this.token_JWT = this.dataService.getToken_JWT();
    // this.user_role = this.dataService.getUserRole();
    // this.token_JWT_success = this.dataService.getTokenJWTsuccess();
    // this.body_login = this.dataService.getBodyLogin();
  }

  user_role = localStorage.getItem('user_role');
  username = localStorage.getItem('username');

  @Input()
  author!: Author;

  @Input()
  authors!: Array<Author>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updateAuthors = new EventEmitter<any>();

  @ViewChild(IonModal)
  modal!: IonModal;

  body_add_author: Author = {
    authorID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
    email: '',
    telephone1: '',
    telephone2: '',
    notes: '',
  };

  body_update_author: Author = {
    authorID: 0,
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
    this.authors = this.authors.filter(
      (element: Author) => element.authorID !== objectID
    );
    this.updateAuthors.emit(this.authors);
    this.modalCtrl.dismiss({ confirmed: true });
    return PostRequest(baseURL + 'DeleteAuthor/' + objectID);
  }

  getNewID(elementList: Array<Author>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].authorID > highestID) {
        highestID = elementList[i].authorID;
      }
    }
    return highestID + 1;
  }

  UpdateElement(): Promise<any> {
    return PostRequest(baseURL + 'UpdateAuthor/', this.author);
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
