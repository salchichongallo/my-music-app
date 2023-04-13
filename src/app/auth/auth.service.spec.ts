import { TestBed } from '@angular/core/testing';
import { DummyAuthService } from './auth.service';

describe('DummyAuthService', () => {
  let auth: DummyAuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    auth = TestBed.inject(DummyAuthService);
  });

  it('authenticates the user', async () => {
    expect(auth.isAuth()).toBeFalse();
    await auth.loginWithCredentials('foo', DummyAuthService.PASSWORD);
    expect(auth.isAuth()).toBeTrue();
  });

  it('does not authenticate user if password is wrong', async () => {
    await auth.loginWithCredentials('foo', 'baz');
    expect(auth.isAuth()).toBeFalse();
  });
});
