import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hyper-angular';
  
  loadingRouteConfig: number = 0;
  constructor(private router: Router, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle("Plateforme Grossiste");

    this.router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = 1;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = 0;
      }
    });
  }
}
