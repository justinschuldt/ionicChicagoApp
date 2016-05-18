import {Page, Alert, NavController} from 'ionic-angular';

// These imports make our Cordova plugins availible
import {Camera} from 'ionic-native';
import {Device} from 'ionic-native';


// This imports the Azure App Service library for our server call
import {AzureService} from './../../providers/azureService';


@Page({
  templateUrl: 'build/pages/capture/capture.html',
  providers: [AzureService]
})
export class CapturePage {
  // First we define the properties of the class, which is any data
  // that is shared between functions and/or the view.
  fileUri: string;
  imageUrl: string;
  title: string;
  imageString: string;
  base64Image: string;
  tag: string;
  // This one is going to be an array of strings.
  tags: string[];
  
  // Constructors define and initialize the properties passed to them.
  // In this case the constructor is making the NavController module
  // availible to the class, and creating an instance of AzureService.
  constructor(
    public nav: NavController,
    public azureService: AzureService) {
      
      // We initialize the tags array so we can push values to it.
      this.tags = [];
  }
  
  capturePhoto(){
    // We can pass the camera api options about how we want the result.
    // This is a block scoped variable becuase we dont need it in the view
    // or other functions.
    let options = { 
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG
    };
    
    Camera.getPicture(options).then((imageData) => {
    // The options we passed in asked for a base64 string of the jpeg format.
    // So we save that string to a class property, because our upload method will need it.
    this.imageString = imageData

    // We also need to show the image to the user in the view, so we add the
    // mime type and encoding to the string, and assign it to another property.
    this.base64Image = "data:image/jpeg;base64," + imageData;
    
    }, error => console.error(error));
  };
  
  uploadPhoto(){
    // Here we create the object that will go to the server.    
    let obj = {
      method: 'post',
      body: {
        imageString: this.imageString,
        title: this.title,
        tags: this.tags,
        uuid: Device.device.uuid
      }
    }
    
    // This is a call to the Azure JavaScript client library. This is essentially
    // the same as sending an $http.post. We used Azure's libaray because it
    // helps you get working with databases very quickly.
    this.azureService.mobileClient.invokeApi('saveImage', obj).then(result => {
      
      // The insert was successful so now we null out the values in the view
      this.title = null;
      this.imageString = null;
      this.base64Image = null;
      this.tags = [];
      
      // Here we are using Ionic's alert dialog. First we create it.
      let alert = Alert.create({
        title: 'Success!',
        subTitle: 'Your photo has been uploaded!',
        buttons: ['OK']
      });
      // Then we present what we created.
      this.nav.present(alert);
      
    }, error => console.error(error));
  };
  
  // This function is the target of a click event on an element, it
  // takes a string as an input parameter and removes it from an array
  removeTag(tag: string){
    this.tags.splice(this.tags.indexOf(tag), 1)
  }
  
}
