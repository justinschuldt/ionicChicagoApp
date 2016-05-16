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

    return new Promise<Image[]>(resolve => {
      let obj = {method: 'get'};
      this.azureService.mobileClient.invokeApi('getImages', obj).then(response => {
        console.debug('image table result: ', response.result);
        this.data = response.result;
        resolve(response.result);
      });
      
    });
  }
  getById(id: string){
    return new Promise<Image>(resolve => {
      this.load().then(result => {
      let image = result.filter(image => image.id === id)[0];
      resolve(image);
      })
    })
    
  }
  
}

