// details.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { allDatabase } from '../home/home.page'; // Assicurati che il percorso sia corretto

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  objectId: string | null | undefined;
  objectData: any;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.objectId = params.get('id');
      this.objectData = this.getObjectData(String(this.objectId));
    });
  }

  getObjectData(id: string) {
    return allDatabase.find(
      (item: { id: { toString: () => string } }) => item.id.toString() === id
    );
  }
}
