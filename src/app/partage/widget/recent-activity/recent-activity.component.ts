import { Component, Input, OnInit } from '@angular/core';
import { RecentActivity } from './recent-activity.model';

@Component({
  selector: 'app-widget-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss']
})
export class RecentActivityComponent implements OnInit {

  @Input() recentActivities: RecentActivity[] = [];
  @Input() height: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
