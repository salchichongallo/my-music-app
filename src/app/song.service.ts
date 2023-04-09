import { Injectable } from '@angular/core';
import { Subject, from } from 'rxjs';

export interface Song {
  name: string;
  thumbnail: string;
  artist: Artist;
}

export interface Artist {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SongService {
  songs = from<Song[]>([
    {
      name: 'Foo',
      thumbnail: 'https://picsum.photos/96',
      artist: { name: 'Artist' },
    },
    {
      name: 'Bar',
      thumbnail: 'https://picsum.photos/96',
      artist: { name: 'Artist' },
    },
    {
      name: 'Baz',
      thumbnail: 'https://picsum.photos/96',
      artist: { name: 'Artist' },
    },
  ]);
}
