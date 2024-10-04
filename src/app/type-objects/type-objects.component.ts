import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { baseURL } from '../enviroenment';
import { DataService, today } from '../services/data.service';
import { PostRequest } from '../services/request.service';
import { TypeObject } from '../services/data.service';

@Component({
  selector: 'app-type-objects',
  templateUrl: './type-objects.component.html',
  styleUrls: ['./../app.component.scss', './type-objects.component.scss'],
})
export class TypeObjectComponent {
  private platform = inject(Platform);
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
  type_object!: TypeObject;

  @Input()
  type_objects!: Array<TypeObject>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updateTypeObject = new EventEmitter<any>();

  body_add_type_object: TypeObject = {
    typeID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  body_update_type_object: TypeObject = {
    typeID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  DeleteElement(typeID: any) {
    this.type_objects = this.type_objects.filter(
      (element: TypeObject) => element.typeID !== typeID
    );
    this.updateTypeObject.emit(this.type_objects);
    this.modalCtrl.dismiss({ confirmed: true });
    return PostRequest(baseURL + 'DeleteTypeObject/' + typeID);
  }

  UpdateElement(): Promise<any> {
    return PostRequest(baseURL + 'UpdateTypeObject/', this.type_object);
  }

  cancel() {
    this.modalCtrl.dismiss({ confirmed: false });
  }
}
