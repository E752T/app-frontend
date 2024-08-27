import { TestBed } from '@angular/core/testing';
import { DatabaseObject } from './interfaces.service';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseObject = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });
});
