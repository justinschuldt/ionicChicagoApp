import {Page, NavController} from 'ionic-angular';

// This imports the image page so that we can navigate there later.
import {ImagePage} from '../image/image';

// This is an interface, and defines exactly what properties
// an object of the type 'Image' will have.
import {Image} from './../../providers/image-provider/image';

//This imports our provider that retrieves data from the server
import {ImageProvider} from './../../providers/image-provider/image-provider';
// This imports our provider with the client library.
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
    
    // This method is called only the first time the page is requested.
    ngOnInit() {
        this.imageProvider.load().then(images => {
            //We assign the result to a property so we can use it in the view.
            this.images = images;
        });
    }

    // This method takes an input of an Image object, that we imported above.
    goToDetail(image: Image) {
        // The ImagePage is pushed to the nav stack along with a parameter
        this.nav.push(ImagePage, {imagesId: image.id});
    }
    
    // This method receives an $event object from the click directive that calls it
    doRefresh(refresher) {
       this.imageProvider.load().then(images => {
            this.images = images;
            // Now that we have new images, we can let the directive know we're done
            refresher.complete();
        });
      
    }
}
