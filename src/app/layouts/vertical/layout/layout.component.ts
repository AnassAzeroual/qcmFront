import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/service/event.service';
import { SIDEBAR_THEME_DARK, SIDEBAR_THEME_LIGHT, SIDEBAR_WIDTH_CONDENSED, SIDEBAR_WIDTH_FIXED, SIDEBAR_WIDTH_SCROLLABLE } from '../../partage/models/layout.model';

@Component({
  selector: 'app-vertical-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit, OnChanges {


  @Input() isBoxed: boolean = false;
  @Input() isCondensed: boolean = false;
  @Input() isScrollable: boolean = false;
  @Input() sidebarTheme: string = "";
  @Input() sidebarType: string = "";

  reRender: boolean = true;
  constructor (
    private eventService: EventService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    document.body.removeAttribute('data-layout');
  }

  /**
   * changes layout configurations 
   */
  ngOnChanges() {
    this.changeLayoutConfig();

  }

  /**
   * controls re-rendering
   */
  _setRerender = () => {
    this.reRender = false;
    setTimeout(() => {
      this.reRender = true;
    }, 0.05);
  }

  /**
   * changes layout related options
   */
  changeLayoutConfig(): void {
    // boxed vs fluid
    if (this.isBoxed) {
      document.body.setAttribute('data-layout-mode', 'boxed');
      this._setRerender();
    } else {
      document.body.removeAttribute('data-layout-mode');
      this._setRerender();
    }

    // left sidebar theme
    switch (this.sidebarTheme) {
      case SIDEBAR_THEME_LIGHT:
        document.body.setAttribute('data-leftbar-theme', 'light');
        break;
      case SIDEBAR_THEME_DARK:
        document.body.setAttribute('data-leftbar-theme', 'dark');
        break;
      default:
        document.body.setAttribute('data-leftbar-theme', 'default');
        break;
    }

    // left sidebar type
    switch (this.sidebarType) {
      case SIDEBAR_WIDTH_CONDENSED:
        document.body.setAttribute('data-leftbar-compact-mode', 'condensed');
        this.isCondensed = true;
        this.isScrollable = false;
        break;
      case SIDEBAR_WIDTH_SCROLLABLE:
        this.isScrollable = true;
        this.isCondensed = false;
        document.body.setAttribute('data-leftbar-compact-mode', 'scrollable');
        break;
      default:
        this.isCondensed = false;
        this.isScrollable = false;
        document.body.removeAttribute('data-leftbar-compact-mode');
        break;
    }
  }

  /**
  * on settings button clicked from topbar
  */
  onSettingsButtonClicked() {
    this.eventService.broadcast('showRightSideBar');
  }

  /**
 * On mobile toggle button clicked
 */
  onToggleMobileMenu() {
    document.body.classList.toggle('sidebar-enable');
  }


}
