import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { LoadingController } from '@ionic/angular';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { LoadingIndicator } from '../../utils/LoadingIndicator';

@Injectable({
  providedIn: 'root'
})
export class ImageHandleService {
  nativepath: any;
  firestore = firebase.storage();
  constructor(// public fileChooser: FileChooser,
              // public filePath: FilePath,
              // public file: File,
              public loadingCtrl: LoadingController,
              private loadingIndicator: LoadingIndicator) {
    console.log('Hello ImagehandlerProvider Provider');
  }

  uploadimage() {
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

  }
  picmsgstore() {
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
  }
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}
