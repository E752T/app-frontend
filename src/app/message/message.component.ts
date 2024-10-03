import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';

import { Platform } from '@ionic/angular';
import { Category, DatabaseObject } from '../services/interfaces.service';
import { bodyAddObject, DataService } from '../services/data.service';

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

  /////////////////////////////////////////////////////////////////////////////////
  //   CATEGORIE   ////////////////////////////////////////////////////////////////
  // TROVA LA CATEGORIA ASSOCIATA CON QUESTO OGGETTO
  IDCategoria = this.message?.categoryID;
  categorie = this.dataService.getAllCategories();
  categoriaTrovata = this.categorie.find(
    (element) => element.categoryID === this.IDCategoria
  );
  // Verifica se la categoria è stata trovata e ottieni il nome
  nomeCategoria = this.categoriaTrovata
    ? this.categoriaTrovata.name
    : 'Categoria non trovata';

  //////////////////////////////////////////////////////////////////////////////////
  // AUTORI  (data binding) ////////////////////////////////////////////////////////
  // TROVA L AUTORE ASSOCIATO CON QUESTO OGGETTO

  IDAutore = this.message?.authorID;
  autori = this.dataService.getAllCategories();
  autoreTrovato = this.autori.find(
    (element) => element.categoryID === this.IDAutore
  );
  // Verifica se la categoria è stata trovata e ottieni il nome
  nomeAutore = this.autoreTrovato
    ? this.autoreTrovato.name
    : 'Autore non trovao';

  //////////////////////////////////////////////////////////////////////////////////
  // OGGETTO  //////////////////////////////////////////////////////////////////////
  public bodyAddObject = bodyAddObject;
  public imageData: string | SafeUrl | undefined = this.message?.cover;

  ////////////////////////////////////////////////////////////////////////////////
  // LOGIN ///////////////////////////////////////////////////////////////////////
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
  constructor(private dataService: DataService, private router: Router) {
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
    console.log("categoria dell'oggetto -> ", this.nomeCategoria);
  }
}
