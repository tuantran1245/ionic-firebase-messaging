import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController, Events, LoadingController, NavController, NavParams, PopoverController } from '@ionic/angular';
import { RequestService } from '../services/request/request.service';
import { ChatService } from '../services/chat/chat.service';
import { ImageHandleService } from '../services/image/image-handle.service';
import { UserService } from '../services/user/user.service';
import { LoadingIndicator } from '../utils/LoadingIndicator';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  myrequests;
  myfriends;
  // messagecounter;
  requestcounter = null;
  username: string;
  avatar: string;
  constructor(public navCtrl: NavController,
              public requestservice: RequestService,
              public events: Events,
              public alertCtrl: AlertController,
              public chatservice: ChatService,
              public zone: NgZone,
              public popoverCtrl: PopoverController,
              public imghandler: ImageHandleService,
              public userservice: UserService,
              private loadingIndicator: LoadingIndicator) {
  }

  ionViewWillEnter() {

  }


}
