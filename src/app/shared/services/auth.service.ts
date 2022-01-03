import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import {  map } from "rxjs/operators";
import { DomSanitizer,  } from '@angular/platform-browser';

import { LoaderService } from './loader.service';
import { Principal } from '../models/principal';
import { IUserAccount } from '../models/user-account.model';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';
import { ServiceFirebaseCloudMessagingService } from './service-firebase-cloud-messaging.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // viewsHabilites: Observable<any[]> = null ;

  private principal : Principal = null;

  baseUrl = environment.base_url;
  multiUser = environment.multi_user;

  
  private principals : Principal[] = [];

  constructor(private httpClient: HttpClient,
              private _sanitizer: DomSanitizer,
              private cookieService: CookieService,
              private serviceFirebaseCloudMessagingService:  ServiceFirebaseCloudMessagingService) {
                  // if (!this.viewsHabilites){
                  //   this.viewsHabilites = this.httpClient.get<any[]>(this.baseUrl + '/api/staticdata/viewHabilities',  { observe: 'body' });
                  // }

               }

  
  login(email, password) {
    return this.httpClient.post<Principal>(this.baseUrl + '/api/user/auth', 
    // return this.httpClient.post<Principal>(this.newAuthUrl + '/api/auth/?_appid=localhost', 
                  {
                    "username": email,
                    "password": password
                  },
                  { observe: 'response' }
        ).pipe(map(authenticateSuccess.bind(this)));
				
				
		function authenticateSuccess(resp) {
      const bearerToken = resp.body.accessToken;
      if (bearerToken) {
				this.principal = resp.body;

        this.principal.safeLogo = this._sanitizer.bypassSecurityTrustUrl(this.principal.logo);
        
        if(this.multiUser) {
          this.principals.push(this.principal);
          this.principal.indexInMultiUsers = (this.principals.length>1 ? this.principals[this.principals.length-2].indexInMultiUsers + 1   :   1 );
          localStorage.setItem('principal_'+this.principal.indexInMultiUsers, JSON.stringify(this.principal));
        }
        else {
          localStorage.setItem('principal', JSON.stringify(this.principal));
        }


        if(environment.enable_push_notification) {
          // force set token for push notification
          this.serviceFirebaseCloudMessagingService.forceSetToken();
        }
				
        return bearerToken;
      } else {
        return null;
      }
    }
  }

  logout() {
	       
    if(this.multiUser) {
      this.principals.splice(this.principals.indexOf(this.principal), 1);

      if(this.principal) {
        localStorage.removeItem('principal_'+this.principal.indexInMultiUsers);
      }

      this.principal = (this.principals.length > 0 ? this.principals[this.principals.length-1] : null);
    }
    else {
      this.principal = null;
      localStorage.removeItem('principal');
    }

    // this.cookieService.delete('access-token', '/', '.sophatel.com');
    // console.log('***session deleted***');
  }



  /************************ refresh token methods *************************/
  refreshToken(): Observable<HttpEvent<any>> {

    return this.httpClient.post<Principal>(this.baseUrl + '/api/user/auth', 
    // return this.httpClient.post<Principal>(this.newAuthUrl + '/api/auth/?_appid=localhost', 
                  {
                    "accessToken": this.getToken()
                  },
                  { observe: 'response' }
        ).pipe(map(refreshTokenSuccess.bind(this)));
				
				
		function refreshTokenSuccess(resp) {
      const bearerToken = resp.body.accessToken;
      if (bearerToken) {
        let indexInMultiUsersBackup = this.principal.indexInMultiUsers;
        this.principal = resp.body;
        

        console.log('*****************************   token refresh success   **********************************');

				this.principal.safeLogo = this._sanitizer.bypassSecurityTrustUrl(this.principal.logo);

        if(this.multiUser) {
          this.principal.indexInMultiUsers = indexInMultiUsersBackup;
          localStorage.setItem('principal_'+indexInMultiUsersBackup, JSON.stringify(this.principal));
        }
        else {
          localStorage.setItem('principal', JSON.stringify(this.principal));
        }
        
        // this.startRefreshTokenTimer();

        return bearerToken;
      } else {
        return null;
      }
    }
  }

  // helper methods

  // private refreshTokenTimeout;

  // public startRefreshTokenTimer() {

  //     // set a timeout to refresh the token a minute before it expires
  //     this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(
  //       data => {
  //         if(!data) {
  //           // this.stopRefreshTokenTimer();
  //           console.warn('Cannot refresh token');
  //         }
  //       },
  //       error => {
  //         // this.stopRefreshTokenTimer();
  //         console.error('error when trying to refresh token: ', error.error.message);
  //       }
  //     ), 3 * 60 * 1000);  // 15min
  // }

  // private stopRefreshTokenTimer() {
  //     clearTimeout(this.refreshTokenTimeout);
  // }

  /**********************************************************************/






  getMyAccount() { 
    return this.httpClient.get<IUserAccount>(this.baseUrl + '/api/user/myaccount', 
      {
          observe: 'body',
          responseType: 'json'
      }
    );
  }

  activateUserEmail(token: string) {
    return this.httpClient.get<any>(this.baseUrl + '/api/user/activate' + "?tk=" + token,
      {
        observe: 'body',
        responseType: 'json'
      }
    );
  }


  saveAccount(account: IUserAccount) { 
    return this.httpClient.post<IUserAccount>(this.baseUrl + '/api/user/edit', account,
      {
          observe: 'body',
          responseType: 'json'
      }
    );
  }




  getPrincipal() {

    if( this.principal == null ) {

      if(this.multiUser) {

        // construct principals array
        let keys = Object.keys(localStorage);
        for (const key of keys) {
          if(key.includes("_")) {
            let principalString = localStorage.getItem(key);
            if(principalString) {
              let principal = JSON.parse(principalString);
              this.principals.push(principal);
            }
          }
        }


        if(this.principals.length) {
          let principalString = localStorage.getItem('principal_'+this.principals[0].indexInMultiUsers);
          if(principalString)
            this.principal = JSON.parse(principalString);
        }
      }
      else {
        let principalString = localStorage.getItem('principal');
        if(principalString)
          this.principal = JSON.parse(principalString);
      }


    }
    
    return this.principal;
  }



  currentUser() {
    return this.getPrincipal();
  }

  
  currentUsers() {
    return this.principals;
  }

  changeCurrentUser(user) {
    if(this.principals.includes(user)) {
      this.principal = user;
    }
    else {
      console.warn('user not found');
    }
  }


  getToken() {
    if( this.principal == null )
      this.principal = this.getPrincipal();
    
    return this.principal?this.principal.accessToken:null;
  }


  
  isAuthenticated(){
    return this.getToken() != null;
  }
	
	
	
	
	
	
	
	
	
	hasAnyAuthority(authorities: string[]): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }

    for (let i = 0; i < authorities.length; i++) {
      if (  this.getPrincipal() && this.getPrincipal().authorities.includes(authorities[i])   ) {
        return true;
      }
    }

    return false;
  }




  
  resetPassword(email: string) {
    return this.httpClient.get<any>(this.baseUrl + '/api/user/resetpassword',
      {
         params: {'email': email},
          observe: 'body',
          responseType: 'json'
      }
    );
  }



  
  changePassword(token: string, newPass: string) {
    return this.httpClient.get<any>(this.baseUrl + '/api/user/changepassword',
      {
         params: {'token': token, 'newpassword': newPass},
          observe: 'body',
          responseType: 'json'
      }
    );
  }


  //  viewhabilities(){
  //     return this.viewsHabilites;
  //  } 
}
