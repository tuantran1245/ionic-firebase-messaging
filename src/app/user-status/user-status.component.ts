import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss'],
})
export class UserStatusComponent {

  @Input() uid;

  presence;

  imageUrl = {
    online: '../assets/user-online.jpeg',
    offline: '../assets/user-busy.png',
    away: '../assets/user-away.png'
  };

  constructor(public userService: UserService) {
    this.presence = this.userService.getPresence(this.uid);
  }

  getOnlineStatusImage() {
    this.presence.subscribe((status) => {
      switch (status) {
        case 'online':
          return this.imageUrl.online;
        case 'offline':
          return this.imageUrl.offline;
        case 'away':
          return this.imageUrl.away;
      }
    });
  }
}
