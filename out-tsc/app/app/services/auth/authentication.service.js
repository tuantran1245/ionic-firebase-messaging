import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoadingIndicator } from '../../utils/LoadingIndicator';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(afAuth, afStore, navCtrl, alertController, database, loadingIndicator) {
        var _this = this;
        this.afAuth = afAuth;
        this.afStore = afStore;
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.database = database;
        this.loadingIndicator = loadingIndicator;
        //// Get auth data, then get firestore user document || null
        this.user = this.afAuth.authState.pipe(switchMap(function (user) {
            if (user) {
                _this.userId = user.uid;
                return _this.afStore.doc("users/" + user.uid).valueChanges();
            }
            else {
                return of(null);
            }
        }));
        this.afAuth.authState.subscribe(function () {
            _this.updateStatusOnConnected();
            _this.updateStatusWhenDisconnected();
        });
    }
    AuthenticationService.prototype.doGoogleLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            _this.loadingIndicator.presentLoading();
            _this.afAuth.auth.signInWithPopup(provider).then(function (credential) {
                _this.afStore.doc("users/" + credential.user.uid).ref.get() // get full doc belongs to that id
                    .then(function (userRef) {
                    _this.loadingIndicator.dismissLoading();
                    console.log('uid: ', credential.user.uid);
                    if (userRef.exists) { // this user has a doc on database
                        _this.navCtrl.navigateRoot('lobby');
                    }
                    else { // user data has not been set.
                        _this.showUserDataPrompt(credential);
                    }
                });
            });
        });
    };
    AuthenticationService.prototype.showUserDataPrompt = function (userCreds) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
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
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (inputData) {
                                        if (inputData.nickName.trim() && inputData.dob && inputData.gender.trim()) {
                                            _this.loadingIndicator.presentLoading();
                                            _this.updateUserData(userCreds, inputData).then(function () {
                                                _this.loadingIndicator.dismissLoading();
                                                _this.navCtrl.navigateRoot('lobby');
                                            });
                                        }
                                        else {
                                            return false; // prevent prompt to close
                                        }
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationService.prototype.updateUserData = function (userCreds, inputData) {
        var userReference = this.afStore
            .doc("users/" + userCreds.user.uid);
        var data = {
            uid: userCreds.user.uid,
            email: userCreds.user.email,
            nickName: inputData.nickName,
            dob: inputData.dob,
            gender: inputData.gender
        };
        return userReference.set(data, { merge: true });
    };
    AuthenticationService.prototype.updateUserStatus = function (userStatus) {
        if (!this.userId) {
            return;
        }
        this.database.object("users/" + this.userId).update({ status: userStatus });
    };
    AuthenticationService.prototype.updateStatusOnConnected = function () {
        var _this = this;
        return this.database.object('.info/connected').valueChanges()
            .subscribe(function (isConnected) {
            console.log("update status online!");
            console.log("Is connected: " + isConnected);
            isConnected ? _this.updateUserStatus('online') : _this.updateUserStatus('offline');
        });
    };
    AuthenticationService.prototype.updateStatusWhenDisconnected = function () {
        console.log("update status offline!");
        this.database.object("users/" + this.userId).query.ref.onDisconnect()
            .update({ status: 'offline' });
    };
    AuthenticationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth,
            AngularFirestore,
            NavController,
            AlertController,
            AngularFireDatabase,
            LoadingIndicator])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map