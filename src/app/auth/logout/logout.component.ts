import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService: AuthService) { }

  ngOnInit(): void {
    this.authenticationService.logout();
  }

  ngAfterViewInit(): void {
    document.body.classList.add('authentication-bg');
  }

}
