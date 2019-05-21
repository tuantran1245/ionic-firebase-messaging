import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

interface UserCertificate {
  uid: string;
  email: string;
  nickName: string;
  dob: string;
  gender: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: Observable<UserCertificate>;

  userId: string;

  constructor(public afAuth: AngularFireAuth,
              public afStore: AngularFirestore,
              private navCtrl: NavController,
              private alertController: AlertController,
              private database: AngularFireDatabase) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        this.userId = user.uid;

        return this.afStore.doc<UserCertificate>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth.signInWithPopup(provider).then((credential) => { // get uid
            this.afStore.doc(`users/${credential.user.uid}`).ref.get() // get full doc belongs to that id
                .then((userRef) => {
                  this.updateStatusOnConnected();
                  this.updateStatusWhenDisconnected();
                  console.log('uid: ', credential.user.uid);
                  if (userRef.exists) { // this user has a doc on database
                    this.navCtrl.navigateRoot('lobby');
                  } else { // user data has not been set.
                    this.showUserDataPrompt(credential);
                  }
                });

          });
    });
  }

  async showUserDataPrompt(userCreds) {
    const alert = await this.alertController.create({
      header: 'Please update your information',
      inputs: [
        {
          name: 'nickName',
          type: 'text',
          placeholder: 'Enter your nick name'
        },
        {
          name: 'dob',
          type: 'date',
          min: '1900-01-01',
          max: '2100-30-12'
        },
        {
          name: 'gender',
          type: 'text',
          placeholder: 'Enter your gender'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (inputData) => {
            if (inputData.nickName.trim() && inputData.dob && inputData.gender.trim()) {
              this.updateUserData(userCreds, inputData).then(() => {
                this.navCtrl.navigateRoot('lobby');
              });
            } else {
              return false; // prevent prompt to close
            }
          }
        }
      ]
    });

    await alert.present();
  }

  updateUserData(userCreds, inputData) {
    const userReference: AngularFirestoreDocument<any> = this.afStore
        .doc(`users/${userCreds.user.uid}`);

    const data = {
      uid: userCreds.user.uid,
      email: userCreds.user.email,
      nickName: inputData.nickName,
      dob: inputData.dob,
      gender: inputData.gender
    };

    return userReference.set(data, {merge: true});
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.navCtrl.navigateRoot(['/']);
    });
  }

  private updateUserStatus(userStatus) { // online/offline
    if (!this.userId) { return; }
    this.database.object(`users/${this.userId}`).update({ status: userStatus });
  }

  private updateStatusOnConnected() { // update status
    return this.database.object('.info/connected').valueChanges()
        .subscribe((isConnected) => {
          console.log(`Is connected: ${isConnected}`);
          isConnected ? this.updateUserStatus('online') : this.updateUserStatus( 'offline');
        });
  }

  private updateStatusWhenDisconnected() {
    this.database.object(`users/${this.userId}`).query.ref.onDisconnect()
        .update({status: 'offline'});
  }

}
