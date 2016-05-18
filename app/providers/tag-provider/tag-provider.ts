import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

// Import the Tag interface so that the class will know
// exactly what kind of data is getting and returning
import {Tag} from './tag';

// Import our Azure App Service library for the api calls
import {AzureService} from './../azureService';

// This is a decorator that Angular2 uses to add metadata to the 
// typescript class, so it knows it can be injected
@Injectable()
export class TagProvider {
  
  // these are both arrays of Tag objects
  tags: Array<Tag>;
  registeredTags: Array<Tag>;

  constructor(
    public http: Http,
    public azureService: AzureService) {}

  // This loads all tags in the database
  loadAll() {

    // The resolve of this promise will be an array of tags.
    return new Promise<Tag[]>(resolve => {
      // Use the Azure library to create a table object to work with
      let tagTable = this.azureService.mobileClient.getTable('tags');
      // Read all rows from the tags database table
      tagTable.read().then(response => {
        // Assign the result to a property
        this.tags = response;
        // Resolve the promise
        resolve(response);
      }, error => {
        console.log('tag table error: ', error);
      });
    });
  }
  
  loadRegistered() {

    // The resolve of this promise will be an array of tags.
    return new Promise<Tag[]>(resolve => {
      // Create the object of an api request
      let obj = {method: 'post'};
      // Use the Azure library to POST the obj to /api/getTags
      this.azureService.mobileClient.invokeApi('getTags', obj).then(response => {
        console.debug('tag api response.result: ', response.result);
        
        // Assign the result to a property
        this.registeredTags = response.result;
        // Resolve the promise
        resolve(response.result);
      }, error => {
        console.log('tag api error: ', error);
      });
    });
  }
}

