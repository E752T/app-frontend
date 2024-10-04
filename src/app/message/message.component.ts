import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';

import { Platform } from '@ionic/angular';
import { Category, DatabaseObject } from '../services/data.service';
import { body_add_object, DataService } from '../services/data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./../app.component.scss', './message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  private platform = inject(Platform);

  @Input() message?: DatabaseObject;

  @Input()
  object!: DatabaseObject;

  @Input()
  objects!: Array<DatabaseObject>;

  @Input()
  search_input!: string | null | undefined;

  //////////////////////////////////////////////////////////////////////////////////
  // OGGETTO  //////////////////////////////////////////////////////////////////////
  public body_add_object = body_add_object;
  public imageData: string | SafeUrl | undefined = this.object?.cover;

  ////////////////////////////////////////////////////////////////////////////////
  // LOGIN ///////////////////////////////////////////////////////////////////////
  public token_JWT: string | null;
  public user_role: string | null;
  public token_JWT_success: boolean | null;
  public username: string | null = localStorage.getItem('username');
  public body_login: any;

  constructor(private dataService: DataService, private router: Router) {
    // GET User
    this.token_JWT = this.dataService.getTokenJWT();
    this.user_role = this.dataService.getUserRole();
    this.username = this.dataService.getUsername();
    this.token_JWT_success = this.dataService.getTokenJWTsuccess();
    this.body_login = this.dataService.getBodyLogin();

    //const base64Data = 'data:image/png;base64,YourBase64ImageDataHere';
    //this.imageData = this.sanitizer.bypassSecurityTrustUrl(base64Data);
  }

  navigateToDetails(id: number) {
    this.router.navigate(['/details', id]);
  }
}
