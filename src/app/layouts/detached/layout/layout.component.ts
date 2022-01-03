import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/service/event.service';
import { SIDEBAR_WIDTH_CONDENSED, SIDEBAR_WIDTH_SCROLLABLE } from '../../partage/models/layout.model';

@Component({
  selector: 'app-detached-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  @Input() sidebarType: string = "";
  isCondensed: boolean = false;
  isScrollable: boolean = false;

  constructor (private eventService: EventService) {
  }

  ngOnInit(): void {
  }

  /**
   * On view init - activating horizontal layout
   */
  ngAfterViewInit() {
    document.body.setAttribute('data-layout', 'detached');
    document.body.removeAttribute('data-layout-mode');
  }


  ngOnChanges() {
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
   * On settings button clicked from topbar
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
