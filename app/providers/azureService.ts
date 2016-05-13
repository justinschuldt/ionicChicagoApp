import {Injectable} from 'angular2/core';

declare var WindowsAzure: any;

@Injectable()
export class AzureService {
    mobileClient: any
    thisCurrentUser: any;
    constructor () {
        // TODO restore the client's currentUser from local storage
        // this.mobileClient = new WindowsAzure.MobileServiceClient("http://localhost:3000/");
        this.mobileClient = new WindowsAzure.MobileServiceClient("http://ionic-chicago.azurewebsites.net/");
        
    }
    setCurrentUser(user: any){
        console.debug('user: ', user);
        this.mobileClient.currentUser = {
            id: user.id,
            mobileServiceAuthenticationToken: user.token
        }
    }
    getCurrentUser(){
        let currentUser = this.mobileClient.currentUser;
        return currentUser;
    }

}