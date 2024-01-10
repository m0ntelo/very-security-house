import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DoorService } from '@core/service/door.service';

export const DoorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const door = inject(DoorService)
  const index = Number(state.url.replace('/', ''));

  if (door.isLoggedIn(index)) {
    return true;
  }

  return router.navigate(['1']);
};
