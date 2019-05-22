import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
var LoadingIndicator = /** @class */ (function () {
    function LoadingIndicator(loadingController) {
        this.loadingController = loadingController;
    }
    LoadingIndicator.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Loading'
                            })];
                    case 1:
                        _a.loadingObject = _b.sent();
                        return [4 /*yield*/, this.loadingObject.present()];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    LoadingIndicator.prototype.dismissLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingObject.dismiss()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LoadingIndicator = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [LoadingController])
    ], LoadingIndicator);
    return LoadingIndicator;
}());
export { LoadingIndicator };
//# sourceMappingURL=LoadingIndicator.js.map