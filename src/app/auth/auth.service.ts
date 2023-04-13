import { Injectable } from '@angular/core';
import { UserService } from '../user.service';

export type AuthUser = {
  username: string;
};

export interface AuthService {
  loginWithCredentials(username: string, password: string): Promise<void>;
  isAuth(): boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DummyAuthService implements AuthService {
  static PASSWORD = 'bar';

  constructor(private userService: UserService) {}

  async loginWithCredentials(username: string, password: string) {
    if (this.checkPassword(password)) {
      this.userService.changeUsername(username);
    }
  }

  private checkPassword(password: string) {
    return password === DummyAuthService.PASSWORD;
  }

  isAuth() {
    return !!this.userService.username();
  }
}
