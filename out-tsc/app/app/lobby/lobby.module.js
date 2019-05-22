import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LobbyPage } from './lobby.page';
import { UserStatusComponent } from '../user-status/user-status.component';
var routes = [
    {
        path: '',
        component: LobbyPage
    }
];
var LobbyPageModule = /** @class */ (function () {
    function LobbyPageModule() {
    }
    LobbyPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                UserStatusComponent
            ],
            declarations: [LobbyPage]
        })
    ], LobbyPageModule);
    return LobbyPageModule;
}());
export { LobbyPageModule };
//# sourceMappingURL=lobby.module.js.map