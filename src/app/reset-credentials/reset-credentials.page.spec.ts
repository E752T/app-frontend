import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetCredentialsPage } from './reset-credentials.page';

describe('ResetCredentialsPage', () => {
  let component: ResetCredentialsPage;
  let fixture: ComponentFixture<ResetCredentialsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetCredentialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
