import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

// Import the Image interface so that the class will know
// exactly what kind of data is getting and returning
import {Image} from './image';

// Import our Azure App Service library for the api calls
import {AzureService} from './../azureService';


// This is a decorator that Angular2 uses to add metadata to the 
// typescript class, so it knows it can be injected
@Injectable()
export class ImageProvider {
  
  // The data property is an array of Images
  data: Array<Image>;

  constructor(
    public http: Http,
    public azureService: AzureService
    ) {}
    
  // The method gets all the Images from an api
  load() {
    // The resolve of the promise will be an Image Array
    return new Promise<Image[]>(resolve => {
      // Create the object of an api request
      let obj = {method: 'get'};
      this.azureService.mobileClient.invokeApi('getImages', obj).then(response => {
        // Assign the result to the data property
        this.data = response.result;
        // Resolve the promise
        resolve(response.result);
      });
      
    });
  }
  getById(id: string){
    // The resolve of the promise will be an Image
    return Promise.resolve<Image>(this.data.filter(image => image.id === id)[0]);
  }
  
}

