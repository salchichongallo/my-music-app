import { Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { DummyAuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: DummyAuthService, private router: Router) {}

  canActivate() {
    if (!this.authService.isAuth()) {
      return this.router.createUrlTree(['login']);
    }

    return true;
  }

  static asActivable() {
    return inject(AuthGuard).canActivate();
  }
}
