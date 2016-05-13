import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

import {Tag} from './tag';
import {AzureService} from './../azureService';

@Injectable()
export class TagProvider {
  tags: Array<Tag>;
  registeredTags: Array<Tag>;

  constructor(public http: Http,
  public azureService: AzureService) {}

  loadAll() {
    if (this.tags) {
      // already loaded data
      return Promise.resolve(this.tags);
    }

    // don't have the data yet
    return new Promise(resolve => {
      let obj = {method: 'get'};
      
      this.azureService.mobileClient.invokeApi('getTags', obj).then(response => {
        console.debug('tag table result: ', response.result);
        this.tags = response.result;
        resolve(response.result);
      });
    });
  }
  loadRegistered() {
    if (this.registeredTags) {
      // already loaded data
      return Promise.resolve(this.registeredTags);
    }

    // don't have the data yet
    return new Promise(resolve => {
      let obj = {method: 'get'};
      console.debug('currentUser: ', this.azureService.getCurrentUser());
      this.azureService.mobileClient.invokeApi('getTags', obj).then(response => {
        console.debug('tag api result: ', response.result);
        this.registeredTags = response.result;
        resolve(response.result);
      });
    });
  }
}

