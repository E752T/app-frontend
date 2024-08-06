import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../services/interfaces.service';
//import { MessageComponent } from './message.component';

describe('DataService', () => {
  let component: DataService;
  let fixture: ComponentFixture<DataService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataService],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
