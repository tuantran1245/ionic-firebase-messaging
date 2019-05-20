import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyD3kYmK8SmJjY-rxcTTy3Qvt6CEj1KclxU',
  authDomain: 'tuantq-messaging-app.firebaseapp.com',
  databaseURL: 'https://tuantq-messaging-app.firebaseio.com',
  projectId: 'tuantq-messaging-app',
  storageBucket: 'tuantq-messaging-app.appspot.com',
  messagingSenderId: '555358170510',
  appId: '1:555358170510:web:98556684e44f1288'
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    //firebase.initializeApp(firebaseConfig);
  }
}
