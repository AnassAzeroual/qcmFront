import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { AuthService } from './auth.service';
import { LoaderService } from './loader.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { BehaviorSubject, Subject } from 'rxjs';
import { ServiceFirebaseCloudMessagingService } from './service-firebase-cloud-messaging.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private loaderService: LoaderService,
					private serviceFirebaseCloudMessagingService:  ServiceFirebaseCloudMessagingService) {}


//*
  addToken(request) {
	const token = this.authService.getToken();
	if (!!token) {
		request = request.clone({
			setHeaders: {
				Authorization: 'Bearer ' + token
			}
		});
	}

	return request;
  }




  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject<HttpEvent<any>>();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('Intercepted!', req);
    
  	this.loaderService.show();

	request = this.addToken(request);
	
	return next.handle(request).pipe(
		map(event => {
			return event;
		}),
		
		tap(
			(event: HttpEvent<any>) => {
			  if (event instanceof HttpResponse) {
				if(event.headers.has('must-refresh-notif-token') && event.headers.get('must-refresh-notif-token') === 'true') {
					// force set token for push notification
					this.serviceFirebaseCloudMessagingService.forceSetToken();
				}
			  }

			  return event;
			},
		  ),

		catchError(error => {
			// Invalid token error
			if (error.status === 401 && request.url.includes('/auth') == false) {

				if (this.refreshTokenInProgress) {
					console.info('handleResponseError   refreshTokenInProgress ................................');
					return this.tokenRefreshed$.pipe(
						switchMap(() => {
							console.info('handleResponseError   tokenRefreshed    observer.next(); ................................');
							request = this.addToken(request);
							this.refreshTokenInProgress = false;
							return next.handle(request);
						}),
						catchError(e => {
							console.warn('handleResponseError   error replay   ................................');
							return throwError(e);
						})
					);
				} else {
					return this.refreshToken(request, next);
				}
				
			}

			return throwError(error);
		}),

		finalize(() => {
			this.loaderService.hide();
		})
	);
  }


  refreshToken(request, next): Observable<HttpEvent<any>> {
	this.refreshTokenInProgress = true;

	console.info('handleResponseError   trying to refresh token ................................');
	return this.authService.refreshToken().pipe(
		switchMap(() => {
			request = this.addToken(request);
			this.refreshTokenInProgress = false;
			this.tokenRefreshedSource.next();
			console.info('handleResponseError   replay with new token ................................');
			return next.handle(request);
		}),
		catchError(e => {
			console.warn('handleResponseError   cannot get new token ................................');
			this.refreshTokenInProgress = false;
			this.tokenRefreshedSource.next();
			this.authService.logout();
			e.status = 401;
			return throwError(e);
		}))  as Observable<HttpEvent<any>>  ;
  }






//*/











}