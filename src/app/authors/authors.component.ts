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
import { OverlayEventDetail } from '@ionic/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { Author } from '../services/interfaces.service';
import { PostRequest } from '../services/request.service';
import { baseURL, today } from '../services/data.service';
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

  bodyAddAuthor: Author = {
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

  bodyModifyAuthor: Author = {
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

  DeleteAuthor(authorID: any) {
    console.log('POST DeleteAuthor : body =>', this.author);

    this.authors.filter((element: Author) => element.authorID !== authorID);
    var authorToDelete = console.log(this.authors);
    this.updateAuthors.emit(authorToDelete);

    return PostRequest(baseURL + 'DeleteAuthor/' + authorID);
  }

  confirmDeleteAuthor() {
    this.DeleteAuthor(this.author?.authorID);
    this.modalCtrl.dismiss({ confirmed: true });
  }

  UpdateAuthorAPI(): Promise<any> {
    console.log('POST UpdateAuthorAPI : body =>', this.author);
    return PostRequest(baseURL + 'UpdateAuthor/', this.author);
  }

  getNewAuthorID(elementList: Array<Author>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].authorID > highestID) {
        highestID = elementList[i].authorID;
      }
    }
    return highestID + 1;
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
