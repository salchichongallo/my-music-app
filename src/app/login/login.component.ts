import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DummyAuthService } from '../auth/auth.service';

export const MAX_USERNAME_LENGTH = 25;
export const MAX_PASSWORD_LENGTH = 100;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<{
    username: FormControl<string | null>;
    password: FormControl<string | null>;
  }> = null!;

  constructor(private authService: DummyAuthService, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(MAX_USERNAME_LENGTH),
      ]),
      password: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(MAX_PASSWORD_LENGTH),
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.attemptToLogin();
    } else {
      this.invalidateForm();
    }
  }

  private async attemptToLogin() {
    const { username, password } = this.loginForm.value;
    await this.authService.loginWithCredentials(username!, password!);
    this.loginForm.reset();
    this.router.navigate(['']);
  }

  private invalidateForm() {
    this.loginForm.markAsDirty();
    this.loginForm.markAllAsTouched();
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
