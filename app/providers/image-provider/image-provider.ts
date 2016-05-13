import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

import {Image} from './image';
import {AzureService} from './../azureService';

@Injectable()
export class ImageProvider {
  data: Array<Image>;

  constructor(public http: Http,
  public azureService: AzureService) {}

  load() {
    if (this.data) {
      //console.debug('this.data: ', this.data);
      // already loaded data
      return Promise.resolve<Image[]>(this.data);
    }
     
    // don't have the data yet
    return new Promise<Image[]>(resolve => {
      // var mobileAppsClient = new WindowsAzure.MobileServiceClient(
      //   "http://localhost:3000"
      // );
      let obj = {method: 'get'};

      this.azureService.mobileClient.invokeApi('getImages', obj).then(response => {
        console.debug('image table result: ', response.result);
        resolve(response.result);
      });
      
    });
  }
}

