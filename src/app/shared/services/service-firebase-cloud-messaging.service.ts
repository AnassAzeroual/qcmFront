import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceFirebaseCloudMessagingService {



  baseUrl = environment.base_url;

  
  private token: string;


  constructor(private httpClient: HttpClient) { }




  forceSetToken() {
    const messaging = firebase.messaging();

    messaging.getToken().then(
      token => {
        this.token = token;

        this.httpClient.post<any>(this.baseUrl + '/api/notif/push/settoken/'+token, { observe: 'body' })
                .subscribe(data => {
                    
                  });
      });
       
  }
}
