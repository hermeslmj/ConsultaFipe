/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FipeService } from './fipe.service';

describe('Service: Fipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FipeService]
    });
  });

  it('should ...', inject([FipeService], (service: FipeService) => {
    expect(service).toBeTruthy();
  }));
});
