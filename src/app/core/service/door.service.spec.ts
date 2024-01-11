import { TestBed } from '@angular/core/testing';
import { DoorService } from './door.service';

describe('DoorService', () => {
  let doorService: DoorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoorService],
    });

    doorService = TestBed.inject(DoorService);
  });

  it('should be created', () => {
    expect(doorService).toBeTruthy();
  });

  it('should initially have all doors with access set to false', () => {
    expect(doorService.router[1].access).toBeFalsy();
    expect(doorService.router[2].access).toBeFalsy();
    expect(doorService.router[3].access).toBeFalsy();
  });

  it('should return true if a door is logged in', () => {
    doorService.router[1].access = true;

    const result = doorService.isLoggedIn(1);

    expect(result).toBeTruthy();
  });

  it('should return false if a door is not logged in', () => {
    doorService.router[2].access = false;

    const result = doorService.isLoggedIn(2);

    expect(result).toBeFalsy();
  });
});