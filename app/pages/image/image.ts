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
      this.navParams = navParams;
    }
  
  ngOnInit() {
    let id = this.navParams.get('imagesId');
    console.debug('image.ts ngOnInit() imagesId: ', id);
    this.imageProvider.getById(id)
      .then(image => {
        this.image = image;
        console.debug('image: ', image);         
    });
    
  }
}
