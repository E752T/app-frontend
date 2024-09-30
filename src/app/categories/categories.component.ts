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
import { today, DataService } from '../services/data.service';
import { PostRequest } from '../services/request.service';
import { Category } from '../services/interfaces.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./../app.component.scss'],
})
export class CategoriesComponent {
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
    private http: HttpClient,
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
  category!: Category;

  @Input()
  categories!: Array<Category>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updateCategories = new EventEmitter<any>();

  body_add_category: Category = {
    categoryID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  body_update_category: Category = {
    categoryID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  DeleteCategory(categoryID: any) {
    console.log('POST DeleteAuthor : body =>', this.category);
    this.categories.filter(
      (element: Category) => element.categoryID !== categoryID
    );
    this.updateCategories.emit(this.categories);
    this.modalCtrl.dismiss({ confirmed: true });
    return PostRequest(baseURL + 'DeleteCategory/' + categoryID);
  }

  confirmDeleteCategory() {
    this.DeleteCategory(this.category?.categoryID);
    this.modalCtrl.dismiss({ confirmed: true });
  }

  UpdateCategoryAPI(): Promise<any> {
    return PostRequest(baseURL + 'UpdateCategory/', this.category);
  }

  getNewCategoryID(elementList: Array<Category>): number {
    let highestID = 0;
    for (let i = 0; i < elementList.length; i++) {
      if (elementList[i].categoryID > highestID) {
        highestID = elementList[i].categoryID;
      }
    }
    return highestID + 1;
  }

  cancel() {
    this.modalCtrl.dismiss({ confirmed: false });
  }
}
