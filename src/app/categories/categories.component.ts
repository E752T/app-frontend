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

import { baseURL } from '../enviroenment';
import { today } from '../services/data.service';
import { PostRequest } from '../services/request.service';
import { OverlayEventDetail } from '@ionic/core';
import { Category } from '../services/interfaces.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  constructor(private http: HttpClient, private modalCtrl: ModalController) {}

  @Input()
  category!: Category;

  @Input()
  categories!: Array<Category>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updateCategories = new EventEmitter<any>();

  @ViewChild(IonModal)
  modal!: IonModal;

  user_role = localStorage.getItem('user_role');

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
