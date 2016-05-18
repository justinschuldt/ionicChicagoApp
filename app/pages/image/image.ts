import {Page, NavController, NavParams} from 'ionic-angular';

import {Image} from './../../providers/image-provider/image';
import {ImageProvider} from './../../providers/image-provider/image-provider';
import {AzureService} from './../../providers/azureService';

@Page({
  templateUrl: 'build/pages/image/image.html',
  providers: [AzureService, ImageProvider]
})
export class ImagePage {
  image: Image;
  
  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public imageProvider: ImageProvider) {
      // this initalizes the navParams for us
      this.navParams = navParams;
    }
  
  ngOnInit() {
    // We are grabbing the 'imagesId' property of the navParams object
    // that was passed in when this page was pushed to the nav stack
    // in feed.ts
    let id = this.navParams.get('imagesId');
    this.imageProvider.getById(id)
      .then(image => {
        // Assign the result to a class property
        this.image = image;   
    });
    
  }
}
