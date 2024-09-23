// details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  objectId: string | null | undefined;
  objectData: any;
  allDatabase: any;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.objectId = params.get('id');
      this.objectData = this.getObjectData(String(this.objectId));
    });
  }

  ngOnInit() {
    this.objectId = this.route.snapshot.paramMap.get('id');
    // Logica per caricare i dettagli in base all'ID
  }

  getObjectData(id: string) {
    return this.allDatabase.find(
      (item: { id: { toString: () => string } }) => item.id.toString() === id
    );
  }
}
