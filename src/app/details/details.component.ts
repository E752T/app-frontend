// details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { DatabaseObject } from '../services/interfaces.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  objectId: string | null | undefined;
  objectData: any;
  private allDatabase: Array<DatabaseObject> = [];

  constructor(private route: ActivatedRoute, private dataservice: DataService) {
    this.route.paramMap.subscribe(async (params) => {
      this.objectId = params.get('id');
      this.objectData = await this.getObjectData(String(this.objectId));
    });
    this.dataservice.getAllDatabase().then((res) => {
      this.allDatabase = res;
    });
  }

  async ngOnInit() {
    this.allDatabase = await this.dataservice.getAllDatabase(); // Ora allDatabase è popolato
    this.objectId = this.route.snapshot.paramMap.get('id');
  }

  async getObjectData(id: string) {
    this.allDatabase = await this.dataservice.getAllDatabase(); // Ora allDatabase è popolato

    const result = this.allDatabase.find(
      (item) => String(item.objectID) === id
    );
    console.log('Database ', this.allDatabase);
    console.log('Object ID Details ', id);

    if (result) {
      return result; // Restituisce i dati dell'oggetto trovato
    } else {
      throw new Error(`Oggetto con ID ${id} non trovato.`);
    }
  }
}
