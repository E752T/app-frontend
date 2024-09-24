// details.component.ts
import { Component, OnInit } from '@angular/core';
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
  private allDatabase: Array<DatabaseObject> = [];

  constructor(
    private route: ActivatedRoute,
    private dataservice: DataService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.allDatabase = await this.dataservice.getAllDatabase();
    this.objectId = this.route.snapshot.paramMap.get('id');
    if (this.objectId) {
      this.objectData = await this.getObjectData(this.objectId);
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
