import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EventService } from '../core/service/event.service';
import {
  LAYOUT_VERTICAL, LAYOUT_HORIZONTAL, LAYOUT_DETACHED, SIDEBAR_THEME_DEFAULT,
  LAYOUT_WIDTH_FLUID, LAYOUT_WIDTH_BOXED, SIDEBAR_WIDTH_FIXED, SIDEBAR_THEME_DARK, SIDEBAR_WIDTH_CONDENSED
} from './partage/models/layout.model';


@Component({
  selector: 'app-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss']
})
export class LayoutContainerComponent implements OnInit {

  // layout related config
  layoutType!: string;
  layoutWidth!: string;
  leftSidebarTheme!: string;
  leftSidebarWidth!: string;
  configuredDemo!: string;

  constructor (private eventService: EventService) {

  }

  ngOnInit(): void {
    // default settings
    this.configuredDemo = environment.demo;

    // tslint:disable-next-line: max-line-length
    this.layoutType = this.configuredDemo === 'creative' ? LAYOUT_HORIZONTAL : (this.configuredDemo === 'modern' ? LAYOUT_DETACHED : LAYOUT_VERTICAL);
    this.layoutWidth = LAYOUT_WIDTH_FLUID;
    this.leftSidebarTheme = SIDEBAR_THEME_DARK;
    this.leftSidebarWidth = SIDEBAR_WIDTH_FIXED;


    // listen to event and change the layout, theme, etc
    this.eventService.subscribe('changeLayout', (layout) => {
      this.layoutType = layout;
    });

    this.eventService.subscribe('changeLayoutWidth', (width) => {
      this.layoutWidth = '';
      setTimeout(() => {
        this.layoutWidth = width;
      }, 20);
    });

    this.eventService.subscribe('changeLeftSidebarTheme', (theme) => {
      this.leftSidebarTheme = theme;
    });

    this.eventService.subscribe('changeLeftSidebarType', (type) => {
      this.leftSidebarWidth = type;
    });

    this.updateDimensions();

    // window.addEventListener('resize', this.updateDimensions);
  }

  ngAfterViewInit() {
    document.body.classList.remove('authentication-bg');
  }

  /**
   * changes left sidebar type based on screen dimensions
   */
  updateDimensions(): void {
    if (window.innerWidth >= 768 && window.innerWidth <= 1028) {
      this.eventService.broadcast('changeLeftSidebarType', SIDEBAR_WIDTH_CONDENSED);
    }
    else if (window.innerWidth > 1028) {
      this.eventService.broadcast('changeLeftSidebarType', SIDEBAR_WIDTH_FIXED);
    }
  }

  /**
   * Check if the vertical layout is requested
   */
  isVerticalLayoutRequested() {
    return this.layoutType === LAYOUT_VERTICAL;
  }

  /**
   * Check if the horizontal layout is requested
   */
  isHorizontalLayoutRequested() {
    return this.layoutType === LAYOUT_HORIZONTAL;
  }

  /**
   * Check if the detached layout is requested
   */
  isDetachedLayoutRequested() {
    return this.layoutType === LAYOUT_DETACHED;
  }

  /**
   * Is boxed layout requeted
   */
  isBoxedRequested() {
    return this.layoutWidth === LAYOUT_WIDTH_BOXED;
  }

}
