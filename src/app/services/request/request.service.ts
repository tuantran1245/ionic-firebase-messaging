import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';
import { UserService } from '../user/user.service';
import { Connreq } from '../../models/interfaces/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  firereq = firebase.database().ref('/requests');
  firefriends = firebase.database().ref('/friends');
  userdetails;
  myfriends;

  constructor(public userservice: UserService,
              public events: Events) {
    console.log('Hello RequestsProvider Provider');
  }

  sendrequest(req: Connreq) {
    const promise = new Promise((resolve, reject) => {

      this.firereq.child(req.recipient).push({sender: req.sender}).then(() => {
        resolve({ success: true });
      });
      // .catch((err) => {
      //   resolve(err);
      // })
    });
    return promise;
  }
  getmyrequests() {
    let allmyrequests;
    let myrequests = [];
    this.firereq.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      allmyrequests = snapshot.val();
      myrequests = [];
      for (const i in allmyrequests) {
        if (i) {
          myrequests.push(allmyrequests[i].sender);
        }
      }
      this.userservice.getallusers().then((res) => {
        const allusers = res;
        this.userdetails = [];
        for (const j in myrequests) {
          if (j) {
            for (const key in allusers) {
              if (myrequests[j] === allusers[key].uid) {
                this.userdetails.push(allusers[key]);
              }
            }
          }
        }
        this.events.publish('gotrequests');
      });

    });
  }
  acceptrequest(buddy) {
    // var myfriends = [];
    const promise = new Promise((resolve, reject) => {
      this.firefriends.child(firebase.auth().currentUser.uid).push({
        uid: buddy.uid
      }).then(() => {
        this.firefriends.child(buddy.uid).push({
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          this.deleterequest(buddy).then(() => {
            resolve(true);
          });

        });
        // .catch((err) => {
        //   reject(err);
        //  })
      });
      // .catch((err) => {
      //   reject(err);
      // })
    });
    return promise;
  }
  deleterequest(buddy) {
    const promise = new Promise((resolve, reject) => {
      this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(buddy.uid).once('value', (snapshot) => {
        let somekey;
        for (const key in snapshot.val()) {
          if (key) {
            somekey = key;
          }
        }
        this.firereq.child(firebase.auth().currentUser.uid).child(somekey).remove().then(() => {
          resolve(true);
        });
      })
          .then(() => {

          }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }
  getmyfriends() {
    const friendsuid = [];
    this.firefriends.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      const allfriends = snapshot.val();
      this.myfriends = [];
      for (const i in allfriends) {
        if (i) {
          friendsuid.push(allfriends[i].uid);
        }
      }

      this.userservice.getallusers().then((users) => {
        this.myfriends = [];
        for (const j in friendsuid) {
          if (j) {
            for (const key in users) {
              if (friendsuid[j] === users[key].uid) {
                this.myfriends.push(users[key]);
              }
            }
          }
        }
        this.events.publish('friends');
      }).catch((err) => {
        alert(err);
      });

    });
  }
}
