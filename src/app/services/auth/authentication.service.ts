import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoadingIndicator } from '../../utils/LoadingIndicator';

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
              private database: AngularFireDatabase,
              private loadingIndicator: LoadingIndicator) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        this.userId = user.uid;
        return this.afStore.doc<UserCertificate>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));

    this.afAuth.authState.subscribe(() => {
      this.updateStatusOnConnected();
      this.updateStatusWhenDisconnected();
    });
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.loadingIndicator.presentLoading();
      this.afAuth.auth.signInWithPopup(provider).then((credential) => { // get uid
            this.afStore.doc(`users/${credential.user.uid}`).ref.get() // get full doc belongs to that id
                .then((userRef) => {
                  this.loadingIndicator.dismissLoading();
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
              this.loadingIndicator.presentLoading();
              this.updateUserData(userCreds, inputData).then(() => {
                this.loadingIndicator.dismissLoading();
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

  private updateUserStatus(userStatus) { // online/offline
    if (!this.userId) { return; }
    this.database.object(`users/${this.userId}`).update({ status: userStatus });
  }

  private updateStatusOnConnected() { // update status
    return this.database.object('.info/connected').valueChanges()
        .subscribe((isConnected) => {
          console.log(`update status online!`);
          console.log(`Is connected: ${isConnected}`);
          isConnected ? this.updateUserStatus('online') : this.updateUserStatus( 'offline');
        });
  }

  private updateStatusWhenDisconnected() {
    console.log(`update status offline!`);
    this.database.object(`users/${this.userId}`).query.ref.onDisconnect()
        .update({status: 'offline'});
  }

}
