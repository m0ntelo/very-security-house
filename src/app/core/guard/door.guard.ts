import { CanActivateFn } from '@angular/router';

export const DoorGuard: CanActivateFn = (route, state) => {
  return false;
};
