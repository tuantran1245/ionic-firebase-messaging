import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  firebuddychats = firebase.database().ref('/buddychats');
  firebuddymessagecounter = firebase.database().ref('/buddychats');
  fireuserStatus = firebase.database().ref('/userstatus');
  buddy: any;
  buddymessages = [];
  msgcount = 0;
  buddyStatus: any;
  constructor(public events: Events) {
    console.log('Hello ChatProvider Provider');
  }
  initializebuddy(buddy) {
    this.buddy = buddy;
  }

  formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  formatDate(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
  }

  addnewmessage(msg) {
    const time = this.formatAMPM(new Date());
    const date = this.formatDate(new Date());
    console.log('date>>>', date);

    if (this.buddy) {
      const promise = new Promise((resolve, reject) => {
        // this.fireuserStatus.child(this.buddy.uid).on('value',(statuss)=>{
        //   let msgstatus = statuss.val();
        this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          timeofmsg: time,
          dateofmsg: date
          // msgStatus:msgstatus.status
        }).then(() => {
          this.firebuddychats.child(this.buddy.uid).child(firebase.auth().currentUser.uid).push({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            timeofmsg: time,
            dateofmsg: date
            // msgStatus:msgstatus.status
          }).then(() => {
            resolve(true);
          });
          // .catch((err) => {
          //   reject(err);
          // })
        });
      });
      // })
      return promise;
    }
  }
  getbuddymessages() {
    let temp;
    this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).on('value', (snapshot) => {
      this.buddymessages = [];
      temp = snapshot.val();

      console.log('counter Message ', temp);
      for (const tempkey in temp) {
        if (tempkey) {
          this.buddymessages.push(temp[tempkey]);
        }
      }
      this.events.publish('newmessage');
    });
  }
  getbuddyStatus() {
    let tmpStatus;

    this.fireuserStatus.child(this.buddy.uid).on('value', (statuss) => {
      tmpStatus = statuss.val();
      console.log('tmpStatus=', tmpStatus);
      if (tmpStatus.status === 1) {
        this.buddyStatus = tmpStatus.data;
      } else {
        const date = tmpStatus.timestamp;
        this.buddyStatus = date;
      }
      this.events.publish('onlieStatus');
    });
  }
  setstatusUser() {
    const promise = new Promise((resolve, reject) => {
      this.fireuserStatus.child(firebase.auth().currentUser.uid).set({
        status: 1,
        data: 'online',
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }
  setStatusOffline() {
    const time = this.formatAMPM(new Date());
    const date = this.formatDate(new Date());

    const promise = new Promise((resolve, reject) => {
      this.fireuserStatus.child(firebase.auth().currentUser.uid).update({
        status: 0,
        data: 'offline',
        timestamp: date + ' at ' + time
      }).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
      });

    });
    return promise;
  }
  // getmsgCounter(buddy){
  //   let msg;
  //   let count=0;
  //   this.msgcount= 0;
  //   this.firebuddymessagecounter.child(firebase.auth().currentUser.uid).child(buddy.uid).on('value', (snapshot) => {
  //     this.msgcount=0;
  //     msg=snapshot.val();
  //       for (var tempkey in msg) {
  //           // console.log('messages',msg[tempkey].msgStatus)
  //           if(msg[tempkey].msgStatus == 0){
  //             this.msgcount = this.msgcount + 1;
  //           }
  //       }
  //       // console.log('counter',count)
  //       this.events.publish('counter');
  //     // if(msg){
  //     //   for (let i = 0; i< msg.length;i++){
  //     //       if(msg.msgStatus==0){
  //     //           count++
  //     //       }
  //     //   }
  //     // }
  //   })
  // }
}
