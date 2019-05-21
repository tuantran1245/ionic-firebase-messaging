import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { User } from 'firebase';
import { el } from '@angular/platform-browser/testing/src/browser_util';

interface UserCertificate {
  uid: string;
  email: string;
  nickName: string;
  dob: string;
  gender: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: Observable<UserCertificate>;

  constructor(public afAuth: AngularFireAuth,
              public afStore: AngularFirestore,
              private navCtrl: NavController,
              private alertController: AlertController) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afStore.doc<UserCertificate>(`users/${user.uid}`).valueChanges();
      } else {
        return null;
      }
    }));
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth.signInWithPopup(provider)
          .then((credential) => {
            this.afStore.doc(`users/${credential.user.uid}`).ref.get()
                .then((userRef) => {
                  console.log('uid: ', credential.user.uid);
                  console.log('user Reference: ', userRef);
                  if (userRef.exists) { // this user has a doc on database
                    this.navCtrl.navigateRoot('chat');
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
                this.navCtrl.navigateRoot('chat');
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

}
