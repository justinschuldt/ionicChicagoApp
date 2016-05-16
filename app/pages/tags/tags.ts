import {Page, NavController} from 'ionic-angular';
import {Push} from 'ionic-native';

import {Tag} from './../../providers/tag-provider/tag';
import {TagProvider} from './../../providers/tag-provider/tag-provider';
import {AzureService} from './../../providers/azureService';

@Page({
  templateUrl: 'build/pages/tags/tags.html',
  providers: [AzureService, TagProvider]
})
export class TagsPage {
  tags: Tag[];
  registeredTags: Tag[];
  constructor(public nav: NavController,
  public tagProvider: TagProvider,
  public azureService: AzureService) {}
  
  ngOnInit() {
    this.tagProvider.loadAll().then(tags => {
        this.tags = tags;
    });
    this.tagProvider.loadRegistered().then(tags => {
        this.registeredTags = tags;
    });
  }
  doRefresh(refresher) {
    this.tagProvider.loadAll().then(tags => {
        this.tags = tags;
        
    });
    this.tagProvider.loadRegistered().then(tags => {
        this.registeredTags = tags;
        refresher.complete();
    });
  }
  registerForNotification(tag: Tag){
    let push = Push.init({
    android: {
        senderID: "489646484292"
    },
    ios: {
        alert: "true",
        badge: true,
        sound: 'false'
    },
    windows: {}
    });

    push.on('registration', (data) => {
        console.log('registration data: ', data);
        console.log(data.registrationId);
        // req.body.gcmRegistrationId, req.body.tags, req.body.template, req.body.options
        let obj = {
            method: 'post',
            body: {
                gcmRegistrationId: data.registrationId,
                tag: tag.id
            }
        };
        this.azureService.mobileClient.invokeApi('gcmRegistration', obj).then(response =>{
            console.debug('push register response: ', response.result);
            this.tags.splice(this.tags.indexOf(tag), 1);
            this.registeredTags.push(tag);
        })
    });

    push.on('notification', (data) => {
        console.log(data.message);
        console.log(data.title);
        console.log(data.count);
        console.log(data.sound);
        console.log(data.image);
        console.log(data.additionalData);
    });

    push.on('error', (e) => {
        console.log(e.message);
    });
    
  }
  unregisterForNotification(tag: Tag){
      this.registeredTags.splice(this.registeredTags.indexOf(tag), 1);
      this.tags.push(tag);
  }
}

