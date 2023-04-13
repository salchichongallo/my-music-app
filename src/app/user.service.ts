import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _username: string = '';

  username() {
    return this._username;
  }

  changeUsername(name: string) {
    this._username = name;
  }
}
