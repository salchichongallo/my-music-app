import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { UserService } from '../user.service';
import { Song, SongService } from '../song.service';
import { from, of } from 'rxjs';

class MockUserService {
  username() {
    return 'bar';
  }
}

class MockSongService {
  songs = from<Song[]>([
    { name: 'foo', thumbnail: '', artist: { name: 'foo-artist' } },
    { name: 'bar', thumbnail: '', artist: { name: 'bar-artist' } },
    { name: 'baz', thumbnail: '', artist: { name: 'baz-artist' } },
  ]);
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: SongService, useClass: MockSongService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders a title', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toBeTruthy();
  });

  it('renders the username', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('[data-testid="username"]')?.textContent,
    ).toContain('@bar');
  });

  it('loads user songs', async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    component.ngOnInit();
    await new Promise(resolve => setTimeout(resolve, 4000));
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('h3').length).toBe(3);
  });
});
