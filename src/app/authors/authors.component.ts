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
import { today } from '../services/data.service';
import { baseURL } from '../enviroenment';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent {
  private platform = inject(Platform);
  constructor(private http: HttpClient, private modalCtrl: ModalController) {}

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

  user_role = localStorage.getItem('user_role');

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
