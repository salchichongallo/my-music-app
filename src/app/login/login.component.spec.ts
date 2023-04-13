import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  tick,
  TestBed,
  fakeAsync,
  ComponentFixture,
} from '@angular/core/testing';

import { AuthService, DummyAuthService } from '../auth/auth.service';

import {
  LoginComponent,
  MAX_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
} from './login.component';

class FakeAuthService implements AuthService {
  async loginWithCredentials() {}
  isAuth() {
    return true;
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: DummyAuthService, useClass: FakeAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const getCompiled = (): HTMLElement => fixture.nativeElement;

  const username = () =>
    getCompiled().querySelector<HTMLInputElement>('#username');

  const password = () =>
    getCompiled().querySelector<HTMLInputElement>('#password');

  const submitForm = () => fixture.componentInstance.onSubmit();

  it('renders login form', () => {
    expect(component).toBeTruthy();
    expect(username()).not.toBeNull();
    expect(password()).not.toBeNull();

    const submit = getCompiled().querySelector('button')!;
    expect(submit).not.toBeNull();
  });

  it('should reset form after submit', fakeAsync(() => {
    component.loginForm.controls.username.setValue('foo');
    component.loginForm.controls.password.setValue('bar');

    expect(username()?.value).toBe('foo');
    expect(password()?.value).toBe('bar');

    submitForm();
    fixture.detectChanges();
    tick();
    expect(username()?.value).toBe('');
    expect(password()?.value).toBe('');
  }));

  it('should render validation errors', fakeAsync(() => {
    const usernameError = () =>
      getCompiled().querySelector('#username-error')?.textContent!;
    const passwordError = () =>
      getCompiled().querySelector('#password-error')?.textContent!;

    // initially hidden
    expect(usernameError()).toBeUndefined();
    expect(passwordError()).toBeUndefined();

    // error are shown after submit
    submitForm();
    fixture.detectChanges();
    expect(usernameError()).toBeTruthy();
    expect(passwordError()).toBeTruthy();
  }));

  const fixedString = (length: number) => new Array(length).fill('_').join('');

  it('validates username max. length', () => {
    const exceedingUsername = fixedString(MAX_USERNAME_LENGTH + 1);
    component.loginForm.controls.username.setValue(exceedingUsername);
    const error = component.loginForm.controls.username.getError('maxlength');
    expect(error).not.toBeNull();
  });

  it('validates password max. length', () => {
    const exceedingPassword = fixedString(MAX_PASSWORD_LENGTH + 1);
    component.loginForm.controls.password.setValue(exceedingPassword);
    const error = component.loginForm.controls.password.getError('maxlength');
    expect(error).not.toBeNull();
  });
});
