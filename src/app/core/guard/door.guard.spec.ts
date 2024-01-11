import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { DoorGuard } from './door.guard';

describe('doorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => DoorGuard(...guardParameters));

  beforeEach(async () => {
    await TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
