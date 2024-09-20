import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { DatabaseObject, ObjectCard } from '../services/interfaces.service';
import { bodyAddObject } from '../services/data.service';
import { baseURL } from '../enviroenment';
import { PostRequest } from '../services/request.service';
import { OverlayEventDetail } from '@ionic/core/components';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  private platform = inject(Platform);

  imageData: string | SafeUrl | undefined;

  constructor(
    private modalCtrl: ModalController,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    //const base64Data = 'data:image/png;base64,YourBase64ImageDataHere';
    //this.imageData = this.sanitizer.bypassSecurityTrustUrl(base64Data);
  }

  navigateToDetails(id: number) {
    this.router.navigate(['/details', id]);
  }

  @Input() message?: DatabaseObject;

  bodyAddObject = bodyAddObject;
  user_role = localStorage.getItem('user_role');

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        // Controlla se il risultato è una stringa e non è null
        if (result !== undefined && typeof result === 'string') {
          this.imageData = result; // Assegna solo se è una stringa

          console.log('carica una immagine ---> ', file);
        } else {
          console.error('Il risultato non è una stringa:', result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  isIos() {
    return this.platform.is('ios');
  }

  cancelObject() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirmUpdate() {
    console.log('API UpdateObjectArchive => ', this.bodyAddObject);
    this.modalCtrl.dismiss(this.bodyAddObject.title, 'confirm');
    PostRequest(baseURL + 'UpdateObjectArchive/', this.bodyAddObject);
  }

  confirmDelete() {
    console.log('API DeleteObject/  => ', this.bodyAddObject);
    PostRequest(baseURL + 'DeleteObject/', this.message?.objectID);
    this.modalCtrl.dismiss({ confirmed: true });
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
