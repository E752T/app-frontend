import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MessageComponentModule } from '../message/message.module';
import { AuthorsModule } from '../authors/authors.module';
import { EditorsModule } from '../editors/editors.module';
import { GeographicalOriginModule } from '../geographical-origins/geographical-origin.module';
import { ShopkeepersModule } from '../shopkeepers/shopkeepers.module';
import { WarehousetModule } from '../warehouses/warehouses.module';
import { TypeObjectModule } from '../type-objects/type-objects.module';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        MessageComponentModule,
        AuthorsModule,
        EditorsModule,
        GeographicalOriginModule,
        ShopkeepersModule,
        WarehousetModule,
        TypeObjectModule,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
