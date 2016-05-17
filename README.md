# Ionic-Chicago's photo sharing app
## Built with Ionic 2, written in TypeScript. Data and push notifications from Azure
### About
This app was written for the Ionic-Chicago Meetup group, as an example for project structure, native interaction, and rapid development. 

The app allows the user to take a photo, give it a title, associate it with some tags (hashtags, etc), and upload it to a server. You can also view the feed of images from other users in real time. Additionally, you can subscribe to push notifications for specific tags and whenever a photo is uploaded with that tag, you will get a push notification.

At the [Meetup on Thursday](http://www.meetup.com/Ionic-Chicago/events/229321860/) I will be going through the code and talking through how hybrid apps like this are made.

### Installation

If you'd like to run this code and play around with it you'll have to have the Ionic SDK installed:
```npm install -g ionic@beta```

Once you clone the repo, install the node modules and cordova plugins with the following commands:
```npm install
ionic state restore```

Now you can serve the project in your browser with:
```ionic serve```

#### Note
Running an app on your device takes a little more work. You'll need the Android SDK or XCode to build the app to your phone and see the camera and push notification plugins work. Here is more information from Ionic about [building to a device](http://ionicframework.com/docs/v2/getting-started/installation/#building-to-a-device).

### Resources used

[Ionic Framework version 2](http://ionicframework.com/docs/v2/)

[Cordova Camera Plugin from Apache](https://github.com/apache/cordova-plugin-camera)

[Cordova Push Plugin from PhoneGap](https://github.com/phonegap/phonegap-plugin-push)

### Backend

I spun up a node app on Azure to get/store data, send push notifications, and handle basic identity management based on device uuid. You're welcome to connect to my backend or you can change where the app is pointing in the `/app/providers/azureService.ts` file with the following line:
```
        this.mobileClient = new WindowsAzure.MobileServiceClient("https://ionic-chicago.azurewebsites.net/");
```

My backend repo is located here: <https://github.com/justinschuldt/ionicChicagoApi>