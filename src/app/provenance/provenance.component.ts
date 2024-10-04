import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { baseURL } from '../enviroenment';
import { PostRequest } from '../services/request.service';
import { DataService, today } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { Provenance } from '../services/interfaces.service';

@Component({
  selector: 'app-provenances',
  templateUrl: './provenance.component.html',
  styleUrls: ['./../app.component.scss', './provenance.component.scss'],
})
export class ProvenancesComponent {
  public token_JWT: string | null;
  public user_role: string | null;
  public token_JWT_success: boolean | null;
  public username: string | null = localStorage.getItem('username');
  public body_login: any;

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    private dataService: DataService
  ) {
    this.token_JWT = this.dataService.getTokenJWT();
    this.user_role = this.dataService.getUserRole();
    this.username = this.dataService.getUsername();
    this.token_JWT_success = this.dataService.getTokenJWTsuccess();
    this.body_login = this.dataService.getBodyLogin();
  }
  @Input()
  provenance!: Provenance;

  @Input()
  provenances!: Array<Provenance>;

  @Input()
  search_input!: string | null | undefined;

  @Output()
  updateProvenances = new EventEmitter<any>();

  body_add_provenance: Provenance = {
    provenanceID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  body_update_provenance: Provenance = {
    provenanceID: 0,
    name: '',
    addedDate: today,
    lastUpdateDate: today,
    description: '',
  };

  DeleteElement(objectID: any) {
    this.provenances = this.provenances.filter(
      (element: Provenance) => element.provenanceID !== objectID
    );
    this.updateProvenances.emit(this.provenances);
    this.modalCtrl.dismiss({ confirmed: true });
    return PostRequest(baseURL + 'DeleteProvenance/' + objectID);
  }



  UpdateElement(): Promise<any> {
    console.log('POST api/UpdateProvenance/ ', this.provenance);
    return PostRequest(baseURL + 'UpdateProvenance/', this.provenance);
  }

  cancel() {
    this.modalCtrl.dismiss({ confirmed: false });
  }
}
