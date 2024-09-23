import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DettagliCartaPage implements OnInit {
  objectId: string | null = '1';
  message: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.objectId = this.route.snapshot.paramMap.get('id');
    // Qui puoi utilizzare objectId per recuperare i dettagli della carta
  }
}
