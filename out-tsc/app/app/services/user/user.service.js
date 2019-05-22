import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
var UserService = /** @class */ (function () {
    function UserService(afAuth, database, afStore, navCtrl) {
        this.afAuth = afAuth;
        this.database = database;
        this.afStore = afStore;
        this.navCtrl = navCtrl;
        this.updateOnUser().subscribe();
        this.updateOnDisconnect().subscribe();
        this.updateOnAway();
    }
    UserService.prototype.updateOnUser = function () {
        var _this = this;
        var connection = this.database.object('.info/connected').valueChanges().pipe(map(function (connected) { return connected ? 'online' : 'offline'; }));
        return this.afAuth.authState.pipe(switchMap(function (user) { return user ? connection : of('offline'); }), tap(function (status) { return _this.setPresence(status); }));
    };
    UserService.prototype.getPresence = function (uid) {
        return this.database.object("status/" + uid).valueChanges();
    };
    UserService.prototype.getCurrentUser = function () {
        return this.afAuth.authState.pipe(first()).toPromise();
    };
    UserService.prototype.getAllUsers = function () {
        return this.afStore.collection('users').valueChanges();
    };
    UserService.prototype.setPresence = function (status) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentUser()];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, this.database.object("status/" + user.uid).update({ status: status })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(UserService.prototype, "timestamp", {
        get: function () {
            return firebase.database.ServerValue.TIMESTAMP;
        },
        enumerable: true,
        configurable: true
    });
    UserService.prototype.updateOnDisconnect = function () {
        var _this = this;
        return this.afAuth.authState.pipe(tap(function (user) {
            if (user) {
                _this.database.object("status/" + user.uid).query.ref.onDisconnect()
                    .update({
                    status: 'offline',
                    timestamp: _this.timestamp
                });
            }
        }));
    };
    UserService.prototype.signOut = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setPresence('offline')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.afAuth.auth.signOut().then(function () {
                                _this.navCtrl.navigateRoot(['/']);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.updateOnAway = function () {
        var _this = this;
        document.onvisibilitychange = function (e) {
            if (document.visibilityState === 'hidden') {
                _this.setPresence('away');
            }
            else {
                _this.setPresence('online');
            }
        };
    };
    UserService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFireAuth,
            AngularFireDatabase,
            AngularFirestore,
            NavController])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map