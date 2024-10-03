// details.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, DatabaseObject } from '../services/interfaces.service';
import { bodyAddObject, DataService } from '../services/data.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PostRequest } from '../services/request.service';
import { baseURL } from '../enviroenment';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss', './../app.component.scss'],
})
export class DetailsComponent implements OnInit {
  objectId: string | null = null;
  objectData: DatabaseObject | null = null;
  bodyAddObject = bodyAddObject;

  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$ = this.dataSubject.asObservable();
  public user_role: string | null;
  id: number | undefined;

  constructor(
    private modalCtrl: ModalController,

    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user_role = this.dataService.getUserRole();
    this.objectData = this.dataService.getObjectData();
  }
  allCategories: Array<Category> = [];
  allDatabase: DatabaseObject[] | undefined = [];

  @Input()
  object!: DatabaseObject;

  @Input()
  objects!: Array<DatabaseObject>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updateObjects = new EventEmitter<any>();

  ngOnInit() {
    this.allCategories = this.dataService.getCategories(); // Ottieni le categorie dal servizio
    console.log('Categorie disponibili in Details:', this.allCategories);

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      let response = this.dataService.getObjectById(this.id);

      console.log(
        'caricamento dettagli | ID ',
        this.id,
        ' | OGGETTO ',
        response
      );

      if (response !== null && response !== undefined) {
        this.objectData = response;
        this.dataService.setObjectData(this.objectData);
      } else {
        this.dataService.setObjectData(null);
      }
    });
  }

  confirmUpdate() {
    console.log('API UpdateObjectArchive => ', this.objectData);
    PostRequest(baseURL + 'UpdateObjectArchive/', this.objectData);
  }

  confirmDelete() {
    console.log('API DeleteObject/', this.objectData?.objectID);
    PostRequest(baseURL + 'DeleteObject/', this.objectData?.objectID);
    //this.tornaIndietro();
  }

  DeleteElement(objectID: any) {
    //////////// ELIMINA OGGETTO DAL DATABASE ///////////////////
    this.allDatabase = this.dataService
      .getAllData()
      ?.filter((element: DatabaseObject) => element.objectID !== objectID);
    console.log(
      'elimina gli oggetti , questi sono i rimanenti',
      this.allDatabase
    );

    this.dataService.removeObject(objectID);
    this.dataService.allDatabase = this.allDatabase;
    ////////////////////////////////////////////////////////////////////////////

    setTimeout(() => {
      this.cancel();
      this.tornaIndietro();
    }, 1500);
    return PostRequest(baseURL + 'DeleteObject/' + objectID);
  }

  getTriggerId(): string {
    return `conferma-salva-oggetto-${this.objectData?.objectID}`;
  }

  cancel() {
    this.modalCtrl.dismiss({ confirmed: true });
  }

  tornaIndietro() {
    this.router.navigate(['']); // Navigates to the root path
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Verifica se objectData è definito
        if (this.objectData) {
          // Associa il risultato del caricamento all'oggetto objectData.cover
          this.objectData.cover = reader.result as string;
        } else {
          console.error('objectData non è definito.');
        }
      };
      // Legge il file come URL di dati
      reader.readAsDataURL(file);
    } else {
      console.error('Nessun file selezionato.');
    }
  }
}
