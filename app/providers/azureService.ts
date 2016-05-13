import {Injectable} from 'angular2/core';
import {Device} from 'ionic-native';

declare var WindowsAzure: any;

@Injectable()
export class AzureService {
    token: string;
    mobileClient: any
    thisCurrentUser: any;
    constructor () {
        this.mobileClient = new WindowsAzure.MobileServiceClient("http://localhost:3000/");
        //this.mobileClient = new WindowsAzure.MobileServiceClient("http://ionic-chicago.azurewebsites.net/");
        
        this.token = localStorage.getItem('token');
        if (!this.token) {
            this.getToken()
        }
        else
            this.setCurrentUser(this.token);
    }
    getToken(){
        let obj = {
            method: 'post',
            body: {
                uuid: Device.device.uuid
            }
        }
        this.mobileClient.invokeApi('getToken', obj).then(response => {
            localStorage.setItem('token', response.result.token);
            this.setCurrentUser(response.result);
        });
    }
    

    setCurrentUser(token: string){
        console.debug('token: ', token);
        this.mobileClient.currentUser = {
            mobileServiceAuthenticationToken: token
        }
        this.mobileClient.currentUser.mobileServiceAuthenticationToken = token;
        
    }
    getCurrentUser(){
        let currentUser = this.mobileClient.currentUser;
        return currentUser;
    }

}