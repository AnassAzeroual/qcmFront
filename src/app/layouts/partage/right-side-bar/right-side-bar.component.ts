import { Component, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { EventService } from 'src/app/core/service/event.service';
import {
  LAYOUT_VERTICAL, SIDEBAR_THEME_DEFAULT, LAYOUT_WIDTH_FLUID, SIDEBAR_WIDTH_FIXED,
  LAYOUT_DETACHED, LAYOUT_HORIZONTAL, SIDEBAR_THEME_DARK
} from '../models/layout.model';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss']
})
export class RightSideBarComponent implements OnInit, OnChanges {

  private isShowing: boolean = false;

  // layout config
  @Input() layoutType!: string;
  @Input() layoutWidth!: string;
  @Input() leftSidebarTheme!: string;
  @Input() leftSidebarWidth!: string;

  disableLayoutWidth: boolean = false;
  disableSidebarTheme: boolean = false;
  disableSidebarType: boolean = false;

  rightSidebarClass = 'end-bar-enabled';

  constructor (
    private renderer: Renderer2,
    private eventService: EventService
  ) {
    // listen to event and open/hide the right sidebar
    this.eventService.subscribe('toggleRightSideBar', () => {
      this.toggleRightSideBar();
    });

    // show
    this.eventService.subscribe('showRightSideBar', () => {
      this.show();
    });

    // hide
    this.eventService.subscribe('hideRightSideBar', () => {
      this.hide();
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.isShowing) {
      this.renderer.addClass(document.body, this.rightSidebarClass);
    } else {
      this.renderer.removeClass(document.body, this.rightSidebarClass);
    }
  }

  /**
   * Toggle the sidebar
   */
  toggleRightSideBar(): void {
    if (document.body.classList.contains(this.rightSidebarClass)) {
      this.renderer.removeClass(document.body, this.rightSidebarClass);
    } else {
      this.renderer.addClass(document.body, this.rightSidebarClass);
    }
  }

  /**
   * Shows the sidebar
   */
  show(): void {
    setTimeout(() => {
      this.isShowing = true;
      this.renderer.addClass(document.body, this.rightSidebarClass);
    }, 100);
  }

  /**
   * Hide the sidebar
   */
  hide(): void {
    if (document.body.classList.contains(this.rightSidebarClass)) {
      this.renderer.removeClass(document.body, this.rightSidebarClass);
      this.isShowing = false;
    }
  }

  /**
   * Change the given layout
   * @param layout layout name
  */
  changeLayout(layout: string): void {
    this.layoutType = layout;
    switch (this.layoutType) {
      case LAYOUT_DETACHED:
        this.disableLayoutWidth = true;
        this.disableSidebarTheme = true;
        this.disableSidebarType = false;
        break;
      case LAYOUT_VERTICAL:
        this.disableLayoutWidth = false;
        this.disableSidebarTheme = false;
        this.disableSidebarType = false;
        break;
      case LAYOUT_HORIZONTAL:
        this.disableLayoutWidth = false;
        this.disableSidebarTheme = true;
        this.disableSidebarType = true;
        break;
    }
    this.eventService.broadcast('changeLayout', layout);
  }

  /**
   * Change the width
   * @param layout width type
   */
  changeLayoutWidth(width: string): void {
    this.layoutWidth = width;
    this.eventService.broadcast('changeLayoutWidth', width);
  }

  /**
   * Change the side bar theme
   * @param theme name
   */
  changeLeftSidebarTheme(theme: string): void {
    this.leftSidebarTheme = theme;
    if (this.layoutType === LAYOUT_VERTICAL) {
      setTimeout(() => {
        this.eventService.broadcast('changeLeftSidebarTheme', theme);
      }, 100);
    }
  }

  /**
   * Change the side bar width
   * @param type type of sidebar
   */
  changeLeftSidebarType(type: string): void {
    this.leftSidebarWidth = type;
    setTimeout(() => {
      if (this.layoutType === LAYOUT_VERTICAL || this.layoutType === LAYOUT_DETACHED) {
        this.eventService.broadcast('changeLeftSidebarType', type);
      }
    }, 100);
  }

  /**
   * Reset everything
   */
  reset(): void {
    this.changeLayout(LAYOUT_VERTICAL);
    this.changeLayoutWidth('fluid');
    this.changeLeftSidebarType(SIDEBAR_WIDTH_FIXED);
    this.changeLeftSidebarTheme(SIDEBAR_THEME_DEFAULT);
  }

}
