import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { LoadingController } from '@ionic/angular';
import { LoadingIndicator } from '../../utils/LoadingIndicator';
var ImageHandleService = /** @class */ (function () {
    function ImageHandleService(// public fileChooser: FileChooser,
    // public filePath: FilePath,
    // public file: File,
    loadingCtrl, loadingIndicator) {
        this.loadingCtrl = loadingCtrl;
        this.loadingIndicator = loadingIndicator;
        this.firestore = firebase.storage();
        console.log('Hello ImagehandlerProvider Provider');
    }
    ImageHandleService.prototype.uploadimage = function () {
        this.loadingIndicator.presentLoading();
        /*const promise = new Promise((resolve, reject) => {
          this.fileChooser.open().then((urlfull) => {
            this.crop.crop(urlfull).then((url) => {
              (window as any).FilePath.resolveNativePath(url, (result) => {
                this.nativepath = result;
                (window as any).resolveLocalFileSystemURL(this.nativepath, (res) => {
                  res.file((resFile) => {
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(resFile);
                    reader.onloadend = (evt: any) => {
                      const imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                      const imageStore = this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                      imageStore.put(imgBlob).then((res) => {
                        this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                          resolve(url);
                          this.loadingIndicator.dismissLoading();
                        }).catch((err) => {
                          this.loadingIndicator.dismissLoading();
                          reject(err);
                        });
                      }).catch((err) => {
                        this.loadingIndicator.dismissLoading();
                        reject(err);
                      });
                    };
                  });
                });
              });
            });
          });
          this.loadingIndicator.dismissLoading();
        });
        return promise;*/
    };
    ImageHandleService.prototype.picmsgstore = function () {
        /*  const promise = new Promise((resolve, reject) => {
            this.fileChooser.open().then((url) => {
              (window as any).FilePath.resolveNativePath(url, (result) => {
                this.nativepath = result;
                (window as any).resolveLocalFileSystemURL(this.nativepath, (res) => {
                  res.file((resFile) => {
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(resFile);
                    reader.onloadend = (evt: any) => {
                      const imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
                      const uuid = this.guid();
                      const imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid);
                      imageStore.put(imgBlob).then((res) => {
                        resolve(res.downloadURL);
                      }).catch((err) => {
                        reject(err);
                      })
                          .catch((err) => {
                            reject(err);
                          });
                    };
                  });
                });
              });
            });
          });
          return promise;
          */
    };
    ImageHandleService.prototype.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
    ImageHandleService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [LoadingController,
            LoadingIndicator])
    ], ImageHandleService);
    return ImageHandleService;
}());
export { ImageHandleService };
//# sourceMappingURL=image-handle.service.js.map