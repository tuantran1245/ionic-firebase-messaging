import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Events } from '@ionic/angular';
var ChatService = /** @class */ (function () {
    function ChatService(events) {
        this.events = events;
        this.firebuddychats = firebase.database().ref('/buddychats');
        this.firebuddymessagecounter = firebase.database().ref('/buddychats');
        this.fireuserStatus = firebase.database().ref('/userstatus');
        this.buddymessages = [];
        this.msgcount = 0;
        console.log('Hello ChatProvider Provider');
    }
    ChatService.prototype.initializebuddy = function (buddy) {
        this.buddy = buddy;
    };
    ChatService.prototype.formatAMPM = function (date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };
    ChatService.prototype.formatDate = function (date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return dd + '/' + mm + '/' + yyyy;
    };
    ChatService.prototype.addnewmessage = function (msg) {
        var _this = this;
        var time = this.formatAMPM(new Date());
        var date = this.formatDate(new Date());
        console.log('date>>>', date);
        if (this.buddy) {
            var promise = new Promise(function (resolve, reject) {
                // this.fireuserStatus.child(this.buddy.uid).on('value',(statuss)=>{
                //   let msgstatus = statuss.val();
                _this.firebuddychats.child(firebase.auth().currentUser.uid).child(_this.buddy.uid).push({
                    sentby: firebase.auth().currentUser.uid,
                    message: msg,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    timeofmsg: time,
                    dateofmsg: date
                    // msgStatus:msgstatus.status
                }).then(function () {
                    _this.firebuddychats.child(_this.buddy.uid).child(firebase.auth().currentUser.uid).push({
                        sentby: firebase.auth().currentUser.uid,
                        message: msg,
                        timestamp: firebase.database.ServerValue.TIMESTAMP,
                        timeofmsg: time,
                        dateofmsg: date
                        // msgStatus:msgstatus.status
                    }).then(function () {
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
    };
    ChatService.prototype.getbuddymessages = function () {
        var _this = this;
        var temp;
        this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).on('value', function (snapshot) {
            _this.buddymessages = [];
            temp = snapshot.val();
            console.log('counter Message ', temp);
            for (var tempkey in temp) {
                if (tempkey) {
                    _this.buddymessages.push(temp[tempkey]);
                }
            }
            _this.events.publish('newmessage');
        });
    };
    ChatService.prototype.getbuddyStatus = function () {
        var _this = this;
        var tmpStatus;
        this.fireuserStatus.child(this.buddy.uid).on('value', function (statuss) {
            tmpStatus = statuss.val();
            console.log('tmpStatus=', tmpStatus);
            if (tmpStatus.status === 1) {
                _this.buddyStatus = tmpStatus.data;
            }
            else {
                var date = tmpStatus.timestamp;
                _this.buddyStatus = date;
            }
            _this.events.publish('onlieStatus');
        });
    };
    ChatService.prototype.setstatusUser = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.fireuserStatus.child(firebase.auth().currentUser.uid).set({
                status: 1,
                data: 'online',
                timestamp: firebase.database.ServerValue.TIMESTAMP
            }).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    ChatService.prototype.setStatusOffline = function () {
        var _this = this;
        var time = this.formatAMPM(new Date());
        var date = this.formatDate(new Date());
        var promise = new Promise(function (resolve, reject) {
            _this.fireuserStatus.child(firebase.auth().currentUser.uid).update({
                status: 0,
                data: 'offline',
                timestamp: date + ' at ' + time
            }).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    ChatService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Events])
    ], ChatService);
    return ChatService;
}());
export { ChatService };
//# sourceMappingURL=chat.service.js.map