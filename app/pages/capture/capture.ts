import {Page, NavController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {Device} from 'ionic-native';

import {AzureService} from './../../providers/azureService';


@Page({
  templateUrl: 'build/pages/capture/capture.html',
  providers: [AzureService]
})
export class CapturePage {
  fileUri: string;
  imageUrl: string;
  title: string;
  imageString: string;
  base64Image: string;
  tag: string;
  tags: string[];
  constructor(
    public nav: NavController,
    public azureService: AzureService) {
      this.tags = [];
    }
  capturePhoto(){
    let options = { 
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG
    };
    
    Camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    this.imageString = imageData
    //console.debug('imageData', imageData);
    //this.fileUri = imageData;
    this.base64Image = "data:image/jpeg;base64," + imageData;
    //console.debug('base64Image: ', base64Image);
    }, (err) => {
    });
  };
  uploadPhoto(){    
    let obj = {
      method: 'post',
      body: {
        imageString: this.imageString,
        title: this.title,
        tags: this.tags,
        uuid: Device.device.uuid
      }
    }
    
    this.azureService.mobileClient.invokeApi('saveImage', obj).then(result => {
      console.debug('insert result', result);
      this.title = null;
      this.imageString = null;
      this.base64Image = null;
      this.tags = null;
    }, error => console.error(error));
  };
  removeTag(tag: string){
    let index = this.tags.indexOf(tag);
    console.log(index);
    
    this.tags.splice(index, 1)
  }
}
