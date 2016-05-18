import {Page} from 'ionic-angular';
import {FeedPage} from '../feed/feed';
import {CapturePage} from '../capture/capture';
import {SettingsPage} from '../settings/settings';
import {TagsPage} from '../tags/tags';


@Page({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = CapturePage;
    tab2Root: any = FeedPage;
    tab3Root: any = TagsPage;
}
