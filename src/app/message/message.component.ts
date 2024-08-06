import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { DatabaseObject, ObjectCard } from '../services/interfaces.service';
import { baseURL, bodyAddObject } from '../services/data.service';
import { PostRequest } from '../services/request.service';
import { OverlayEventDetail } from '@ionic/core/components';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  imageData: SafeUrl | undefined;

  private platform = inject(Platform);

  constructor(
    private modalCtrl: ModalController,
    private sanitizer: DomSanitizer
  ) {
    const base64Data = 'data:image/png;base64,YourBase64ImageDataHere';
    this.imageData = this.sanitizer.bypassSecurityTrustUrl(base64Data);
  }

  @Input() message?: DatabaseObject;

  bodyAddObject = bodyAddObject;

  isIos() {
    return this.platform.is('ios');
  }
  cancelObject() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirmModifyObject() {
    this.modalCtrl.dismiss(this.bodyAddObject.title, 'confirm');
    console.log('UpdateObjectArchive => ', this.bodyAddObject);
    PostRequest(baseURL + 'UpdateObjectArchive/', this.bodyAddObject);
  }

  onWillDismissObject(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
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

  confirmDeleteObject() {
    PostRequest(baseURL + 'DeleteObject/', this.message?.objectID);
    this.modalCtrl.dismiss({ confirmed: true });
  }

}
