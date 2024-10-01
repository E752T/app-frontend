// details.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, DatabaseObject } from '../services/interfaces.service';
import { bodyAddObject, DataService } from '../services/data.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ModalController } from '@ionic/angular';
import { PostRequest } from '../services/request.service';
import { baseURL } from '../enviroenment';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./../app.component.scss', './details.component.scss'],
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
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private route: ActivatedRoute
  ) {
    this.user_role = this.dataService.getUserRole();
  }
  allCategories: Array<Category> = [];
  allDatabase: DatabaseObject[] | undefined = [];

  ngOnInit() {
    this.allCategories = this.dataService.getCategories(); // Ottieni le categorie dal servizio
    console.log('Categorie disponibili in Details:', this.allCategories);


    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      let response = this.dataService.getObjectById(this.id);
      console.log('caricamento dettagli ID ', this.id);
      console.log('caricamento dettagli OGGETTO ', response);

      if (response !== null && response !== undefined) {
        this.objectData = response;
      } else {
        this.objectData = null;
      }
    });
  }

  confirmUpdate() {
    console.log('API UpdateObjectArchive => ', this.bodyAddObject);
    //this.cancel();
    PostRequest(baseURL + 'UpdateObjectArchive/', this.bodyAddObject);
  }

  confirmDelete() {
    console.log('API DeleteObject/  => ', this.bodyAddObject);
    PostRequest(baseURL + 'DeleteObject/', this.objectData?.objectID);
    this.cancel();
  }

  getTriggerId(): string {
    return `conferma-salva-oggetto-${this.objectData?.objectID}`;
  }

  cancel() {
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
          console.error("objectData non è definito.");
        }
      };
      // Legge il file come URL di dati
      reader.readAsDataURL(file);
    } else {
      console.error("Nessun file selezionato.");
    }
  }
}
