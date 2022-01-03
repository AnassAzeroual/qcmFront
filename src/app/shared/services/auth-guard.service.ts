import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';

import { AuthService } from './auth.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,public zone: NgZone, private authService: AuthService, private alertService: AlertService,) { }
  
  
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

	let authoritie : Array<string>;
	let authoritiess  : Array<string>;
	let authorities = route.data.authorities as Array<string>;
	

		


	
	// this.authService.viewhabilities().subscribe( (data) => {
		
	// 	//console.log(data);
		
	// 	for (const iterator of data) {
			
			
	// 			if ( "/"+iterator.name ===state.url){
	// 				if(!authorities){
	// 					authorities=[]
	// 				}
	// 			for (const i of iterator.roles) {
	// 				authorities.push(i.label);

	// 			}
	// 		}
	// 		if(authorities){
	// 			let tet = this.authService.hasAnyAuthority(authorities);
	// 		if(!tet) {
	// 			console.warn('you dont have authorities = [' + authorities + ']  !');
	// 			userMessage = 'Your permissions do not allow you to access that resource.';
	// 			this.router.navigateByUrl('/page/error/page-not-found');
	// 		}
	// 		}
			
	// 	}
	// 	//console.log(authorities);
		
	// });
	
		//console.log(state.url)

		
		
		
		
		//console.log(authorities)
		let ret = false;		// no access by default
		let userMessage = "";
		
		
		ret = this.authService.isAuthenticated();

				
		if(!ret) {	   // not authenticated
				console.warn('you are not authenticated!');
				userMessage = 'Please Sign In!';
				this.router.navigateByUrl('/login');
		}
		else if(authorities) {		//  check if there is authorities data
			ret = this.authService.hasAnyAuthority(authorities);
			if(!ret) {
				console.warn('you dont have authorities = [' + authorities + ']  !');
				userMessage = 'Your permissions do not allow you to access that resource.';
				this.router.navigateByUrl('/page/error/page-not-found');
			}
		}
		

		return ret;
  }

   getResolvedUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
        .map(v => v.url.map(segment => segment.toString()).join('/'))
        .join('/');
}
}
