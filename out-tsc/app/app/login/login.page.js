import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(authService) {
        this.authService = authService;
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.onGoogleLoginButtonClicked = function () {
        this.authService.doGoogleLogin();
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map