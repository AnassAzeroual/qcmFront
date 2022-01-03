import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-widget-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  loggedInUser: any = {};
  constructor (
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.currentUser();
  }

}
