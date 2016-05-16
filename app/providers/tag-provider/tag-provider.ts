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
      let tagTable = this.azureService.mobileClient.getTable('tags');
      tagTable.read().then(response => {
        console.debug('tag table response: ', response);
        this.tags = response;
        resolve(response);
      }, error => {
        console.log('tag table error: ', error);
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
      let obj = {method: 'post'};
      //console.debug('currentUser: ', this.azureService.getCurrentUser());
      this.azureService.mobileClient.invokeApi('getTags', obj).then(response => {
        console.debug('tag api response.result: ', response.result);
        this.registeredTags = response.result;
        resolve(response.result);
      }, error => {
        console.log('tag api error: ', error);
      });
    });
  }
}

