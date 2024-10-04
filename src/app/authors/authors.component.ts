import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { Author } from '../services/data.service';
import { PostRequest } from '../services/request.service';
import { DataService, today } from '../services/data.service';
import { baseURL } from '../enviroenment';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./../app.component.scss', './authors.component.scss'],
})
export class AuthorsComponent {
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
  author!: Author;

  @Input()
  authors!: Array<Author>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updateAuthors = new EventEmitter<any>();

  body_add_author = this.dataService.body_add_author;
  body_update_author = this.dataService.body_update_author;

  DeleteElement(objectID: any) {
    this.authors = this.authors.filter(
      (element: Author) => element.authorID !== objectID
    );
    this.updateAuthors.emit(this.authors);
    this.modalCtrl.dismiss({ confirmed: true });
    return PostRequest(baseURL + 'DeleteAuthor/' + objectID);
  }

  UpdateElement(): Promise<any> {
    return PostRequest(baseURL + 'UpdateAuthor/', this.author);
  }

  cancel() {
    this.modalCtrl.dismiss({ confirmed: false });
  }
}
