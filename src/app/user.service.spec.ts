import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('changes the username', () => {
    expect(service.username()).toBe('');
    service.changeUsername('foo');
    expect(service.username()).toBe('foo');
  });
});
