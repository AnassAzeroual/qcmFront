import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    const alertService = this.injector.get(AlertService);

    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
      console.error('handleError HttpErrorResponse: ' + JSON.stringify(error));

      // Server Error
      message = this.getServerMessage(error);
      stackTrace = this.getServerStack(error);

      if(message)
        alertService.error(message,  'MODAL');

			//console.log(message);
    } else {
      console.error('handleError ClientError: ' + error);

      // Client Error
      message = this.getClientMessage(error);
      stackTrace = this.getClientStack(error);
      alertService.error('Message: ' + message);
      console.log('Error StackTrace: ' + stackTrace);

      throw(error);
    }
  }

  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }
    return error.message ? error.message : error.toString();
  }

  getClientStack(error: Error): string {
    return error.stack;
  }

  getServerMessage(error: HttpErrorResponse): string {
    if (error.status === 401) {
      const authService = this.injector.get(AuthService);
      const router = this.injector.get(Router);
      const ngZone = this.injector.get(NgZone);

      let msg = '';
        if (authService.getToken()) {
            msg = 'Session expired';
        }
        else {
            msg = null; // error.error.message;
        }
        authService.logout();
        ngZone.run(() => router.navigateByUrl('/login')).then();
        return msg;
    }else if(error.status === 0){
      return "Serveur Indisponible"
    }
    else {
        return error.error.message || error.error.error;
    }

  }

  getServerStack(error: HttpErrorResponse): string {
    // handle stack trace
    return 'stack';
  }
}
