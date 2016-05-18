import {Page, NavController} from 'ionic-angular';

// import the Cordova push plugin
import {Push} from 'ionic-native';

// import the Tag interface
import {Tag} from './../../providers/tag-provider/tag';

// import the providers
import {TagProvider} from './../../providers/tag-provider/tag-provider';
import {AzureService} from './../../providers/azureService';

@Page({
    templateUrl: 'build/pages/tags/tags.html',
    providers: [AzureService, TagProvider]
})
export class TagsPage {
    // these are both arrays of Tag objects
    tags: Array<Tag>;
    registeredTags: Array<Tag>;
    
    // declare and initialize our proivders
    constructor(
        public tagProvider: TagProvider,
        public azureService: AzureService
    ) {}
    
    // This automatically loads the first time the page is requested
    ngOnInit() {
        this.tagProvider.loadAll().then(tags => {
            this.tags = tags;
        });
        this.tagProvider.loadRegistered().then(tags => {
            this.registeredTags = tags;
        });
    }
    
    // This method takes a Tag object
    registerForNotification(tag: Tag){
        //initialize the push plugin with platform specific config
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
        
        // This method will be called when the pugin successfully
        // registers with the native messaging api.
        push.on('registration', (data) => {
            // The registration data object is returned with a platform specific token
            console.log('registration data: ', data);
            
            // Android returns a registrationId string that 
            // needs to be sent to the server.
            console.log(data.registrationId);
            
            // We create the request object, sending a GCM Id and the Tag's id
            let obj = {
                method: 'post',
                body: {
                    gcmRegistrationId: data.registrationId,
                    tag: tag.id
                }
            };
            
            // We are using the Azure App Service library to wrap our
            // RESTful http calls to the server.
            this.azureService.mobileClient.invokeApi('gcmRegistration', obj).then(response =>{
                
                // Once we've registered with the server, we can move that tag 
                // from the tags array to the registeredTags array.
                this.tags.splice(this.tags.indexOf(tag), 1);
                this.registeredTags.push(tag);
            })
        });
        
        // This is the method that will be called when your phone recieves a 
        // push notification. It's possible to incude extra data in the
        // notification so you can route to a page, etc.
        push.on('notification', (data) => {
            console.log(data.message);
            console.log(data.title);
            console.log(data.count);
            console.log(data.sound);
            console.log(data.image);
            console.log(data.additionalData);
        });
        
        // This is error callback for the push-plugin
        push.on('error', (e) => {
            console.log(e.message);
        });
        
    }
    
    // This just moves the tag from the registeredTags array
    // to the tags array. The server would need to be called
    // to really unregister.
    unregisterForNotification(tag: Tag){
        this.registeredTags.splice(this.registeredTags.indexOf(tag), 1);
        this.tags.push(tag);
    }
    
    // This method receives an $event object from the click directive that calls it
    doRefresh(refresher) {
        this.tagProvider.loadAll().then(tags => {
            this.tags = tags;
            
        });
        this.tagProvider.loadRegistered().then(tags => {
            this.registeredTags = tags;
            // Now that we have new images, we can let the directive know we're done
            refresher.complete();
        });
    }
}
