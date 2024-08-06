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

import { baseURL, today } from '../services/data.service';
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
  [x: string]: any;

  constructor(
    private http: HttpClient,
    private modalController: ModalController
  ) {}

  private platform = inject(Platform);

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

  modalCtrl: any;

  bodyAddCategory: Category = {
    categoryID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  bodyModifyCategory: Category = {
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

    var categoryToDelete = console.log(this.categories);
    this.updateCategories.emit(categoryToDelete);

    return PostRequest(baseURL + 'DeleteCategory/' + categoryID);
  }

  confirmDeleteCategory() {
    this.DeleteCategory(this.category?.categoryID);
    this.modalCtrl.dismiss({ confirmed: true });
  }

  UpdateCategoryAPI(): Promise<any> {
    console.log('POST UpdateCategory : body =>', this.category);
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
    this.modalController.dismiss({ confirmed: true });
  }

  cancel() {
    this.modalController.dismiss({ confirmed: false });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }
}
