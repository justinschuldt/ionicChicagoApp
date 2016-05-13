import {Page, NavController} from 'ionic-angular';
import {ImagePage} from '../image/image';

import {Image} from './../../providers/image-provider/image';
import {ImageProvider} from './../../providers/image-provider/image-provider';
import {AzureService} from './../../providers/azureService';

@Page({
  templateUrl: 'build/pages/feed/feed.html',
  providers: [AzureService, ImageProvider]
})
export class FeedPage {
  images: Image[];
  tabsPage: any;
  constructor(
    public nav: NavController,
    public imageProvider: ImageProvider
    ) {}
    ngOnInit() {
        this.imageProvider.load().then(images => {
          console.debug('images: ', images);
            this.images = images;
        });
    }


    goToDetail(image: Image) {
        this.nav.push(ImagePage, {ImagesId: image.id});
    }
    
    doRefresh(refresher) {
       this.imageProvider.load().then(images => {
          console.debug('images: ', images);
            this.images = images;
            refresher.complete();
        });
      
    }
}
