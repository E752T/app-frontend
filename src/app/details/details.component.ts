// details.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Author,
  Category,
  DatabaseObject,
  GeographicalOrigin,
  Provenance,
  Publisher,
  Shopkeeper,
  TypeObject,
  Warehouse,
} from '../services/data.service';
import { DataService, today } from '../services/data.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PostRequest } from '../services/request.service';
import { baseURL } from '../enviroenment';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { FunctionsService } from '../services/functions.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss', './../app.component.scss'],
})
export class DetailsComponent implements OnInit {
  /////////////////////////////////////////////////////////////////
  // User
  public user_role: string | null; // ruolo dell'utente

  /////////////////////////////////////////////////////////////////
  // Database degli oggetti
  body_add_object = this.dataService.body_add_object;
  objectId: string | null = null; // id dell'oggetto
  objectData: DatabaseObject | null = null; // dati dell'oggetto

  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$ = this.dataSubject.asObservable();

  id: number | undefined; // id dell'oggetto
  messageDismissModal: string = '';

  /////////////////////////////////////////////////////////////////
  // Database degli altri elementi che non sono oggetti
  // nomi delle categorie esterne all'oggetto ottenibili interpolando
  // le ID dentro gli oggetti e gli altri Database
  nomeCategoria: any;
  nomeAutore: any;
  nomeEsercente: any;
  nomeTipoDiOggetto: any;
  nomeOrigin: any;
  nomeProvenance: any;
  nomePublisher: any;
  nomeWarehouse: any;

  // carica i corpi delle richieste vuoti da riempire
  body_add_author = this.dataService.body_add_author;
  body_add_category = this.dataService.body_add_category;
  body_add_geographical_origin = this.dataService.body_add_geographical_origin;
  body_add_provenance = this.dataService.body_add_provenance;
  body_add_publisher = this.dataService.body_add_publisher;
  body_add_shopkeeper = this.dataService.body_add_shopkeeper;
  body_add_type_object = this.dataService.body_add_type_object;
  body_add_warehouse = this.dataService.body_add_warehouse;

  /////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////
  // inizializzazione dei database delle varie categorie
  allDatabase: DatabaseObject[] | undefined = [];
  filteredObjects: Array<Author> = [];

  allCategories: Array<Category> = [];
  allAuthors: Array<Author> = [];
  allGeographicalOrigins: Array<GeographicalOrigin> = [];
  allProvenances: Array<Provenance> = [];
  allPublishers: Array<Publisher> = [];
  allShopkeepers: Array<Shopkeeper> = [];
  allTypeObjects: Array<TypeObject> = [];
  allWarehouses: Array<Warehouse> = [];

  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private functionsService: FunctionsService
  ) {
    this.user_role = this.dataService.getUserRole(); // prendi il ruolo dell'utente
    this.objectData = this.dataService.getObjectData(); // prendi i dati dell'oggetto selezionato
  }

  @Input()
  object!: DatabaseObject;

  @Input()
  objects!: Array<DatabaseObject>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updateObjects = new EventEmitter<any>();

  @Output() objectDeleted = new EventEmitter<any>();

  ngOnInit() {
    /////////////////////////////////////////////////////////////////
    // Database Esterni
    // prendi gli oggetti del databasee dal dataService
    this.allCategories = this.dataService.getCategories(); // Ottieni le categorie dal servizio
    this.allAuthors = this.dataService.getAuthors(); // Ottieni gli autori
    this.allGeographicalOrigins = this.dataService.getGeographicalOrigins(); // Ottieni gli autori
    this.allProvenances = this.dataService.getProvenances(); // Ottieni gli autori
    this.allPublishers = this.dataService.getPublishers(); // Ottieni gli autori
    this.allShopkeepers = this.dataService.getShopkeepers(); // Ottieni gli autori
    this.allTypeObjects = this.dataService.getTypeObjects(); // Ottieni gli autori
    this.allWarehouses = this.dataService.getWarehouses(); // Ottieni gli autori

    this.route.params.subscribe((params) => {
      this.id = +params['id']; // estrai l' ID dal URL
      let response = this.dataService.getObjectById(this.id); // prendi i dati di un oggetto con specifica ID
      //console.log('Dettagli dell'oggetto con   | ID ', this.id, ' | OGGETTO ', response);
      if (response !== null && response !== undefined) {
        this.objectData = response; // associa ad objectData la risposta di dataService l'oggetto
        this.dataService.setObjectData(this.objectData); // salva objectData su dataService

        // CARICA I DATI DELLE ALTRE TABELLE ASSOCIATE CON QUESTO OGGETTO

        /////////////////////////////////////////////////////////////////////////////////
        // CATEGORIE
        // Trova la categoria associata con questo oggetto dal database
        const IDCategoria = this.objectData.categoryID;
        let categoria_trovata = this.allCategories.find(
          (categoria) => categoria.categoryID === IDCategoria
        );

        if (categoria_trovata) {
          this.nomeCategoria = categoria_trovata.name;
        } else {
          this.nomeCategoria = 'Categoria non trovata';
        }
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        // AUTORI
        // Trova la categoria associata con questo oggetto dal database
        const IDautore = this.objectData.authorID;
        let autore_trovato = this.allAuthors.find(
          (elemento) => elemento.authorID === IDautore
        );

        if (autore_trovato) {
          this.nomeAutore = autore_trovato.name;
        } else {
          this.nomeAutore = 'Autore non trovata';
        }
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        // Esercenti / Shopkeeper
        // Trova la categoria associata con questo oggetto dal database
        const shopkeeperID = this.objectData.shopkeeperID;
        let esercente_trovato = this.allShopkeepers.find(
          (elemento) => elemento.shopkeeperID === shopkeeperID
        );

        if (esercente_trovato) {
          this.nomeEsercente = esercente_trovato.uniqueName;
        } else {
          this.nomeEsercente = 'Esercente non trovato';
        }
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        // Publisher / Editori
        // Trova la categoria associata con questo oggetto dal database
        const publisherID = this.objectData.publisherID;
        let publisher_trovato = this.allPublishers.find(
          (elemento) => elemento.publisherID === publisherID
        );

        if (publisher_trovato) {
          this.nomePublisher = publisher_trovato.name;
        } else {
          this.nomePublisher = 'Publisher non trovato';
        }
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        // Tipo
        // Trova la categoria associata con questo oggetto dal database
        const typeID = this.objectData.typeID;
        let tipoTrovato = this.allTypeObjects.find(
          (elemento) => elemento.typeID === typeID
        );

        if (tipoTrovato) {
          this.nomeTipoDiOggetto = tipoTrovato.name;
        } else {
          this.nomeTipoDiOggetto = 'Tipo non trovato';
        }
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        // Origine
        // Trova la categoria associata con questo oggetto dal database
        const geographicalOriginID = this.objectData.geographicalOriginID;
        let origineTrovata = this.allGeographicalOrigins.find(
          (elemento) => elemento.geographicalOriginID === geographicalOriginID
        );

        if (origineTrovata) {
          this.nomeOrigin = origineTrovata.name;
        } else {
          this.nomeOrigin = 'Origine non trovata';
        }
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        // Provenienza
        // Trova la categoria associata con questo oggetto dal database
        const provenanceID = this.objectData.provenanceID;
        let provenienzaTrovata = this.allProvenances.find(
          (elemento) => elemento.provenanceID === provenanceID
        );

        if (provenienzaTrovata) {
          this.nomeProvenance = provenienzaTrovata.name;
        } else {
          this.nomeProvenance = 'Origine non trovata';
        }
        /////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////
        // Magazzini
        // Trova la categoria associata con questo oggetto dal database
        const warehouseID = this.objectData.warehouseID;
        let magazzinoTrovato = this.allWarehouses.find(
          (elemento) => elemento.warehouseID === warehouseID
        );

        if (magazzinoTrovato) {
          this.nomeWarehouse = magazzinoTrovato.name;
        } else {
          this.nomeWarehouse = 'Magazzino non trovata';
        }
        /////////////////////////////////////////////////////////////////////////////////
      }
    });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.messageDismissModal = ``;
    }
  }

  confirmUpdate() {
    // Aggiurna un ogetto e tutte le informazioni ad esso legate

    // trova l'ID dell'autore da mettere nell'oggetto
    // dato il nome di input dell'autore scelto
    let authorID = this.functionsService.findIdByName(
      this.dataService.getAuthors(),
      this.nomeAutore,
      'authorID'
    );

    let categoryID = this.functionsService.findIdByName(
      this.dataService.getCategories(),
      this.nomeCategoria,
      'categoryID'
    );

    let typeID = this.functionsService.findIdByName(
      this.dataService.getTypeObjects(),
      this.nomeTipoDiOggetto,
      'typeID'
    );

    let shopkeeperID = this.functionsService.findIdByName(
      this.dataService.getShopkeepers(),
      this.nomeEsercente,
      'shopkeeperID'
    );

    let warehouseID = this.functionsService.findIdByName(
      this.dataService.getWarehouses(),
      this.nomeWarehouse,
      'warehouseID'
    );

    let publisherID = this.functionsService.findIdByName(
      this.dataService.getPublishers(),
      this.nomePublisher,
      'publisherID'
    );

    let geographicalOriginID = this.functionsService.findIdByName(
      this.dataService.getGeographicalOrigins(),
      this.nomeOrigin,
      'geographicalOriginID'
    );

    let provenanceID = this.functionsService.findIdByName(
      this.dataService.getProvenances(),
      this.nomeProvenance,
      'provenanceID'
    );

    ////////////////////////////////////////////////////////

    // console.log(' --> nomeEsercente ', this.nomeEsercente);
    // console.log(' --> getShopkeepers ', this.dataService.getShopkeepers());

    ////////////////////////////////////////////////////////

    console.log('nuovo authorID', authorID);
    console.log('nuovo provenanceID', provenanceID);

    console.log('nuovo categoryID', categoryID);
    console.log('nuovo shopkeeperID', shopkeeperID);
    console.log('nuovo typeID', typeID);
    console.log('nuovo warehouseID', warehouseID);
    console.log('nuovo publisherID', publisherID);
    console.log('nuovo geographicalOriginID', geographicalOriginID);

    // aggiungi le ID all'oggetto prendendole dagli array del progetto
    if (this.objectData) {
      this.objectData.authorID = authorID;
      this.objectData.shopkeeperID = shopkeeperID;
      this.objectData.categoryID = categoryID;
      this.objectData.typeID = typeID;
      this.objectData.warehouseID = warehouseID;
      this.objectData.publisherID = publisherID;
      this.objectData.geographicalOriginID = geographicalOriginID;
      this.objectData.provenanceID = provenanceID;

      //this.objectData.userID = userID;

      console.log('UpdateObjectArchive => ', this.objectData);
      PostRequest(baseURL + 'UpdateObjectArchive/', this.objectData);
    } else {
      console.log('Oggetto non trovato, impossibile da aggiornare...');
    }
  }

  confirmDelete() {
    // elimina un oggetto prendendo l'ID dell'oggetto da eliminare
    console.log('API DeleteObject/', this.objectData?.objectID);
    PostRequest(baseURL + 'DeleteObject/', this.objectData?.objectID);
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
    // associa ad una variabile il file dell'immagine selezionata
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

  async DeleteElement(objectID: any) {
    this.dataService.removeObject(objectID);

    this.updateObjects.emit(this.dataService.filteredObjects);
    this.cancel();
    this.tornaIndietro();

    console.log(
      'Elemento dal Database eliminato ',
      this.dataService.allDatabase
    );

    return PostRequest(baseURL + 'DeleteObject/' + objectID);
  }

  /////////////////////////////////////////////////////////////////////////////
  // Funzioni per aggiungere i vari elementi direttamente su dettagli
  // attarverso i botoni e le modali
  /////////////////////////////////////////////////////////////////////////////

  addAuthor() {
    this.functionsService
      .CreateAuthor()
      .then((response) => {
        console.log('Autore aggiunto con successo:', response);
      })
      .catch((error) => {
        console.error("Errore durante l'aggiunta dell'autore:", error);
      });
  }

  addCategory() {
    this.functionsService
      .CreateCategory()
      .then((response) => {
        console.log('Categoria aggiunta con successo:', response);
      })
      .catch((error) => {
        console.error("Errore durante l'aggiunta della categoria:", error);
      });
  }

  addOrigin() {
    this.functionsService
      .CreateOrigin()
      .then((response) => {
        console.log('Origine aggiunta con successo:', response);
      })
      .catch((error) => {
        console.error("Errore durante l'aggiunta Origine:", error);
      });
  }

  addPublisher() {
    this.functionsService
      .CreatePublisher()
      .then((response) => {
        console.log('Publisher aggiunta con successo:', response);
      })
      .catch((error) => {
        console.error("Errore durante l'aggiunta Publisher:", error);
      });
  }

  addProvenance() {
    this.functionsService
      .CreateProvenance()
      .then((response) => {
        console.log('Provenance aggiunta con successo:', response);
      })
      .catch((error) => {
        console.error("Errore durante l'aggiunta Provenance:", error);
      });
  }

  addShopkeeper() {
    this.functionsService
      .CreateShopkeeper()
      .then((response) => {
        console.log('Shopkeeper aggiunta con successo:', response);
      })
      .catch((error) => {
        console.error("Errore durante l'aggiunta Shopkeeper:", error);
      });
  }

  addWarehouse() {
    this.functionsService
      .CreateWarehouse()
      .then((response) => {
        console.log('Warehouse aggiunta con successo:', response);
      })
      .catch((error) => {
        console.error("Errore durante l'aggiunta Warehouse:", error);
      });
  }

  addType() {
    this.functionsService
      .CreateType()
      .then((response) => {
        console.log('Type aggiunta con successo:', response);
      })
      .catch((error) => {
        console.error("Errore durante l'aggiunta Type:", error);
      });
  }
}
