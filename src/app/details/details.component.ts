// details.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseObject } from '../services/interfaces.service';
import { DataService } from '../services/data.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  objectId: string | null = null;
  objectData: DatabaseObject | null = null;

  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$ = this.dataSubject.asObservable();
  public user_role: string | null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef

  ) {    this.user_role = this.dataService.getUserRole();
  }

  //public allDatabase: Array<DatabaseObject> = [];

  allDatabase: DatabaseObject[] = [];
  filteredObjects: DatabaseObject[] = [];
  
  async ngOnInit() {
    this.dataService.getAllDatabase().subscribe(
      (data: DatabaseObject[]) => {
        this.allDatabase = data;
        this.filteredObjects = this.allDatabase; // Filtrare gli oggetti se necessario
        console.log("Database caricato con successo dentro details", this.allDatabase);
        this.cdr.detectChanges(); // Attivare manualmente il rilevamento delle modifiche
      }
      
    );
  }

  async getObjectData(id: string): Promise<DatabaseObject | null> {
    const result = this.allDatabase.find(
      (item) => String(item.objectID) === id
    );

    if (result) {
      return result; // Restituisce i dati dell'oggetto trovato
    } else {
      console.error(`Oggetto con ID ${id} non trovato.`);
      return null; // Restituisce null se non trovato
    }
  }

  cancel() {
    this.router.navigate(['']); // Navigates to the root path
  }
}
