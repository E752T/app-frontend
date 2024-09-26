// details.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { DatabaseObject } from '../services/interfaces.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  objectId: string | null = null;
  objectData: DatabaseObject | null = null;


  constructor(
    private route: ActivatedRoute,
    private dataservice: DataService,
    private router: Router,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef

  ) {}

  //public allDatabase: Array<DatabaseObject> = [];

  allDatabase: DatabaseObject[] = [];
  filteredObjects: DatabaseObject[] = [];
  
  async ngOnInit() {
    try {
      this.allDatabase = this.dataservice.allDatabase;
      this.filteredObjects = this.allDatabase;
      this.cdr.detectChanges(); // Manually trigger change detection
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
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
