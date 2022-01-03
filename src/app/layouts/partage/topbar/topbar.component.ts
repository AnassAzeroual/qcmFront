import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/core/service/auth.service';
import { EventService } from 'src/app/core/service/event.service';
import { AppsItem } from '../models/apps.model';
import { Language } from '../models/language.model';
import { NotificationItem } from '../models/notification.model';
import { ProfileOptionItem } from '../models/profileoption.model';
import { SearchResultItem, SearchUserItem } from '../models/search.model';
import { SIDEBAR_WIDTH_CONDENSED, SIDEBAR_WIDTH_FIXED } from '../models/layout.model';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit,AfterViewInit  {


  @Input() hideLogo: boolean = false;
  @Input() cssClasses: string = '';
  @Input() topbarDark: boolean = false;
  @Input() layoutType: string = '';

  notificationList: NotificationItem[] = [];
  languages: Language[] = [];
  apps: AppsItem[] = [];
  profileOptions: ProfileOptionItem[] = [];
  selectedLanguage?: Language;
  searchResults: SearchResultItem[] = [];
  searchUsers: SearchUserItem[] = [];
  loggedInUser: any = {};
  topnavCollapsed: boolean = false;
  autoclose: boolean = false;
  
  // output events
  @Output() settingsButtonClicked = new EventEmitter<boolean>();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  constructor(
    private authService: AuthenticationService,
    private eventService: EventService
  ) { }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onResizebar();
    }, .01);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  
    this.onResizebar();
    
  }

  ngOnInit(): void {
    this.loggedInUser = this.authService.currentUser()
    // get notifications
    this._fetchNotifications();
    // get supported languages
    this._fetchLanguages();
    // get apps
    this._fetchApps();
    // get profile menu options
    this._fetchProfileOptions();
    // get search results
    this._fetchSearchData();
  }


  /**
   * Fetches notifications
   */
  _fetchNotifications(): void {
    this.notificationList = [{
      text: 'Caleb Flakelar commented on Admin',
      subText: '1 min ago',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'primary',
      redirectTo: '/notification/1'
    },
    {
      text: 'New user registered.',
      subText: '5 min ago',
      icon: 'mdi mdi-account-plus',
      bgColor: 'info',
      redirectTo: '/notification/2'
    },
    {
      text: 'Cristina Pride',
      subText: 'Hi, How are you? What about our next meeting',
      avatar: 'assets/images/users/avatar-4.jpg',
      bgColor: 'success',
      redirectTo: '/notification/3'
    },
    {
      text: 'Caleb Flakelar commented on Admin',
      subText: '2 days ago',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'danger',
      redirectTo: '/notification/4'
    },
    {
      text: 'Caleb Flakelar commented on Admin',
      subText: '1 min ago',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'primary',
      redirectTo: '/notification/5'
    },
    {
      text: 'New user registered.',
      subText: '5 min ago',
      icon: 'mdi mdi-account-plus',
      bgColor: 'info',
      redirectTo: '/notification/6'
    },
    {
      text: 'Cristina Pride',
      subText: 'Hi, How are you? What about our next meeting',
      avatar: 'assets/images/users/avatar-1.jpg',
      bgColor: 'success',
      redirectTo: '/notification/7'
    },
    {
      text: 'Caleb Flakelar commented on Admin',
      subText: '2 days ago',
      icon: 'mdi mdi-comment-account-outline',
      bgColor: 'danger',
      redirectTo: '/notification/8'
    }];
  }

  /**
   * Fetches supported languages
   */
  _fetchLanguages(): void {
    this.languages = [{
      id: 1,
      name: 'English',
      flag: 'assets/images/flags/us.jpg',
    },
    {
      id: 2,
      name: 'German',
      flag: 'assets/images/flags/germany.jpg',
    },
    {
      id: 3,
      name: 'Italian',
      flag: 'assets/images/flags/italy.jpg',
    },
    {
      id: 4,
      name: 'Spanish',
      flag: 'assets/images/flags/spain.jpg',
    },
    {
      id: 5,
      name: 'Russian',
      flag: 'assets/images/flags/russia.jpg',
    }];
    this.selectedLanguage = this.languages[0];
  }

  /**
   * Fetches brands
   */
  _fetchApps(): void {
    this.apps = [{
      id: 1,
      name: 'Slack',
      logo: 'assets/images/brands/slack.png',
    },
    {
      id: 2,
      name: 'Github',
      logo: 'assets/images/brands/github.png',
    },
    {
      id: 3,
      name: 'Dribbble',
      logo: 'assets/images/brands/dribbble.png',
    },
    {
      id: 4,
      name: 'Bitbucket',
      logo: 'assets/images/brands/bitbucket.png',
    },
    {
      id: 5,
      name: 'Dropbox',
      logo: 'assets/images/brands/dropbox.png',
    },
    {
      id: 6,
      name: 'G Suite',
      logo: 'assets/images/brands/g-suite.png',
    }];
  }

  /**
   * Fetches profile options
   */
  _fetchProfileOptions(): void {
    this.profileOptions = [
      {
        label: 'Mon compte',
        icon: 'mdi mdi-account-circle',
        redirectTo: '/',
      },
      {
        label: 'Paramètres',
        icon: 'mdi mdi-account-edit',
        redirectTo: '/',
      },
      {
        label: 'Support',
        icon: 'mdi mdi-lifebuoy',
        redirectTo: '/',
      },
      {
        label: 'Écran verrouillé',
        icon: 'mdi mdi-lock-outline',
        redirectTo: '/account/lock-screen',
      },
      {
        label: 'Se déconnecter',
        icon: 'mdi mdi-logout',
        redirectTo: '/logout',
      },
    ];

  }

  /**
   * Fetches search results
   */
  _fetchSearchData(): void {
    this.searchResults = [{
      id: 1,
      text: 'Analytics Report',
      icon: 'uil-notes',
    },
    {
      id: 2,
      text: 'How can I help you?',
      icon: 'uil-life-ring',
    },
    {
      id: 3,
      text: 'User profile settings',
      icon: 'uil-cog',
    }];
    this.searchUsers = [{
      id: 1,
      name: 'Erwin Brown',
      position: 'UI Designer',
      profile: 'assets/images/users/avatar-2.jpg'
    },
    {
      id: 2,
      name: 'Jacob Deo',
      position: 'Developer',
      profile: 'assets/images/users/avatar-5.jpg'
    }]

  }


  /**
  * Change the language
  * @param language selected language from dropdown
  */
  changeLanguage(language: Language) {
    this.selectedLanguage = language;
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /*
  * Toggle left sidebar width - condensed
  */

  toggleSidebarWidth(): void {
    if (document.body.hasAttribute('data-leftbar-compact-mode') && document.body.getAttribute('data-leftbar-compact-mode') === 'condensed') {
      // document.body.removeAttribute('data-leftbar-compact-mode');
      this.eventService.broadcast('changeLeftSidebarType', SIDEBAR_WIDTH_FIXED);
    } else {
      // document.body.setAttribute('data-leftbar-compact-mode', 'condensed');
      this.eventService.broadcast('changeLeftSidebarType', SIDEBAR_WIDTH_CONDENSED);
    }
  }



  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    this.topnavCollapsed = !this.topnavCollapsed;
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  onResizebar(){
   
    if(window.innerWidth <= 1380){
      this.autoclose = true;
      this.eventService.broadcast('changeLeftSidebarType', SIDEBAR_WIDTH_CONDENSED);
    }
    else if (this.autoclose == true) {
      this.autoclose = false;
      this.eventService.broadcast('changeLeftSidebarType', SIDEBAR_WIDTH_FIXED);
    }
  }

}
