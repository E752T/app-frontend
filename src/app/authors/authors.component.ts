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

  DeleteElement(authorID: any) {
    console.log('POST DeleteAuthor : body =>', this.author);
    // Filtrare gli autori in base all'authorID
    this.authors = this.authors.filter(
      (element: Author) => element.authorID !== authorID
    );
    // Emettere un evento per aggiornare gli autori
    this.updateAuthors.emit(this.authors);
    // Effettuare una richiesta di eliminazione dell'autore
    return PostRequest(baseURL + 'DeleteAuthor/' + authorID);
  }

  confirmDelete() {
    this.DeleteElement(this.author?.authorID);
    this.modalCtrl.dismiss({ confirmed: true });
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
