import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.username = this.userService.username();
  }
}
