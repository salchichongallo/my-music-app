import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Song, SongService } from '../song.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  username = '';
  songs: Song[] = [];

  constructor(
    private userService: UserService,
    private songService: SongService,
  ) {}

  ngOnInit() {
    this.username = this.userService.username();
    this.songService.songs.subscribe(song => {
      this.songs.push(song);
    });
  }
}
