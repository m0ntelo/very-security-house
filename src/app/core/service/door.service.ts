import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoorService {

  public router: any = {
    1: { access: false },
    2: { access: false },
    3: { access: false }
  }
  
  constructor() { }

  public isLoggedIn(index: number): boolean {
    return this.router[index].access;
  }
}
