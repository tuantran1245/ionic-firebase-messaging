import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afAuth: AngularFireAuth,
              private database: AngularFireDatabase,
              public afStore: AngularFirestore,
              private navCtrl: NavController) {
    this.updateOnUser().subscribe();
    this.updateOnDisconnect().subscribe();
    this.updateOnAway();
  }

  updateOnUser() {
    const connection = this.database.object('.info/connected').valueChanges().pipe(
        map(connected => connected ? 'online' : 'offline')
    );

    return this.afAuth.authState.pipe(
        switchMap(user =>  user ? connection : of('offline')),
        tap(status => this.setPresence(status))
    );
  }

  getPresence(uid: string) {
    return this.database.object(`status/${uid}`).valueChanges();
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  getAllUsers() {
    return this.afStore.collection('users').valueChanges();
  }

  async setPresence(status: string) {
    const user = await this.getCurrentUser();
    if (user) {
      return this.database.object(`status/${user.uid}`).update({ status });
    }
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  updateOnDisconnect() {
    return this.afAuth.authState.pipe(
        tap(user => {
          if (user) {
            this.database.object(`status/${user.uid}`).query.ref.onDisconnect()
                .update({
                  status: 'offline',
                  timestamp: this.timestamp
                });
          }
        })
    );
  }

  async signOut() {
    await this.setPresence('offline');
    await this.afAuth.auth.signOut().then(() => {
      this.navCtrl.navigateRoot(['/']);
    });
  }

  updateOnAway() {
    document.onvisibilitychange = (e) => {
      if (document.visibilityState === 'hidden') {
        this.setPresence('away');
      } else {
        this.setPresence('online');
      }
    };
  }

}
