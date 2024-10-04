// import { Injectable } from '@angular/core';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

// @Injectable({
//   providedIn: 'root'
// })
// export class CameraService {

//   constructor(private camera: Camera) { }

//   public takePicture(): Promise<string> {
//     const options: CameraOptions = {
//       quality: 100,
//       destinationType: this.camera.DestinationType.DATA_URL,
//       encodingType: this.camera.EncodingType.JPEG,
//       mediaType: this.camera.MediaType.PICTURE
//     };

//     return this.camera.getPicture(options).then((imageData: string) => {
//       return 'data:image/jpeg;base64,' + imageData;
//     }, err => {
//       console.error(err);
//       throw err;
//     });
//   }
// }
