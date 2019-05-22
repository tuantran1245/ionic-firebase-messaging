import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})
export class LobbyPage implements OnInit {

  userList;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((allUsers) => {
      this.userList = allUsers;
      console.log('user list: ', allUsers);
    });
  }

  onLogoutButtonClicked() {
    this.userService.signOut();
  }
}
