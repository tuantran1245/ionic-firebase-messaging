import * as tslib_1 from "tslib";
import { Component, NgZone } from '@angular/core';
import { AlertController, Events, NavController, PopoverController } from '@ionic/angular';
import { ChatService } from '../services/chat/chat.service';
import { ImageHandleService } from '../services/image/image-handle.service';
import { UserService } from '../services/user/user.service';
import { LoadingIndicator } from '../utils/LoadingIndicator';
var ChatPage = /** @class */ (function () {
    function ChatPage(navCtrl, events, alertCtrl, chatservice, zone, popoverCtrl, imghandler, userservice, loadingIndicator) {
        this.navCtrl = navCtrl;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.chatservice = chatservice;
        this.zone = zone;
        this.popoverCtrl = popoverCtrl;
        this.imghandler = imghandler;
        this.userservice = userservice;
        this.loadingIndicator = loadingIndicator;
        // messagecounter;
        this.requestcounter = null;
    }
    ChatPage.prototype.ionViewWillEnter = function () {
    };
    ChatPage = tslib_1.__decorate([
        Component({
            selector: 'app-chat',
            templateUrl: './chat.page.html',
            styleUrls: ['./chat.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            Events,
            AlertController,
            ChatService,
            NgZone,
            PopoverController,
            ImageHandleService,
            UserService,
            LoadingIndicator])
    ], ChatPage);
    return ChatPage;
}());
export { ChatPage };
//# sourceMappingURL=chat.page.js.map