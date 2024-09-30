// details.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseObject } from '../services/interfaces.service';
import { DataService } from '../services/data.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./../app.component.scss', './details.component.scss'],
})
export class DetailsComponent implements OnInit {
  objectId: string | null = null;
  objectData: DatabaseObject | null = null;

  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$ = this.dataSubject.asObservable();
  public user_role: string | null;
  id: number | undefined;

  constructor(
    private dataService: DataService,
    private router: Router,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private route: ActivatedRoute
  ) {
    this.user_role = this.dataService.getUserRole();
  }

  allDatabase: DatabaseObject[] | undefined = [];

  ngOnInit() {
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

  cancel() {
    this.router.navigate(['']); // Navigates to the root path
  }
}
