import { TestBed } from '@angular/core/testing';

import { AssignActorService } from './assign-actor.service';

describe('AssignActorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignActorService = TestBed.get(AssignActorService);
    expect(service).toBeTruthy();
  });
});
