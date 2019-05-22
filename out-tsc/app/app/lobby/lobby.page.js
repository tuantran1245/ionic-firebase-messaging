import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
var LobbyPage = /** @class */ (function () {
    function LobbyPage(userService) {
        this.userService = userService;
    }
    LobbyPage.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getAllUsers().subscribe(function (allUsers) {
            _this.userList = allUsers;
            console.log('user list: ', allUsers);
        });
    };
    LobbyPage.prototype.onLogoutButtonClicked = function () {
        this.userService.signOut();
    };
    LobbyPage = tslib_1.__decorate([
        Component({
            selector: 'app-lobby',
            templateUrl: './lobby.page.html',
            styleUrls: ['./lobby.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [UserService])
    ], LobbyPage);
    return LobbyPage;
}());
export { LobbyPage };
//# sourceMappingURL=lobby.page.js.map