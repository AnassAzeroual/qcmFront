import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

declare global {
  interface Window {
    jsVectorMap?: any;
  }
}


@Component({
  selector: 'app-widget-vectormap',
  templateUrl: './vectormap.component.html',
  styleUrls: ['./vectormap.component.scss'],
  providers: []
})
export class VectormapComponent implements AfterViewInit {

  @Input() width: string = '';
  @Input() height: string = '';
  @Input() options: any = {};
  @Input() type: string = "";
  @Input() mapId: string = "map";

  constructor () {

  }

  /**
   * generates vecotor map
   */
  ngAfterViewInit(): void {
    const map = new window.jsVectorMap({
      selector: '#' + this.mapId,
      map: this.type,
      ...this.options
    })
  }

}
