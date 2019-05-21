import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss'],
})
export class UserStatusComponent implements OnInit {

  @Input() uid;

  presence;

  constructor(public userService: UserService) {
    this.presence = this.userService.getPresence(this.uid);
  }

  ngOnInit() {}

}
