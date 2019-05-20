import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class LoadingIndicator {
    loadingObject;

    constructor(public loadingController: LoadingController) {}

    async presentLoading() {
        this.loadingObject = await this.loadingController.create({
            message: 'Loading'
        });
        return await this.loadingObject.present();
    }

    async dismissLoading() {
       return await this.loadingObject.dismiss();
    }
}
