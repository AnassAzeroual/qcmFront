import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { INotification }    from '../models/notification.model';

import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  baseUrl = environment.base_url;
	
	
	
	
	unreadnotifs: Subject<INotification[]> = new Subject();

  


  constructor(private httpClient: HttpClient) { }
  
  
	
	
  
  refreshUnread(pageSize: number) {
		this.getMyUnreadNotifications(0, pageSize).subscribe(
			(data: any) => {
				this.unreadnotifs.next( data );
			}
		);
  }
	
	
	
  
  getMyUnreadNotifications(page: number, pageSize: number) {
		let pageParams = {"page": page+'', "size": pageSize+''};
    return this.httpClient.get<INotification[]>(this.baseUrl + '/api/notif/unread', { observe: 'body', params: pageParams  });
  }
	
	
	
  getAllMyNotifications(page: number, pageSize: number) {
		let pageParams = {"page": page+'', "size": pageSize+''};
    return this.httpClient.get<any>(this.baseUrl + '/api/notif/all', { observe: 'body', params: pageParams });
  }
	
  
  readNotificationById(idhash: any) {
    return this.httpClient.get<INotification>(this.baseUrl + '/api/notif/read/'+idhash, { observe: 'body' });
  }
  
  getNextNotificationId(idhash: any) {
    return this.httpClient.get<string>(this.baseUrl + '/api/notif/next/'+idhash, { observe: 'body' });
  }
  
  getPreviousNotificationId(idhash: any) {
    return this.httpClient.get<string>(this.baseUrl + '/api/notif/previous/'+idhash, { observe: 'body' });
  }
	
  
  deleteNotifications(arrayIdhash: string[]) {
    return this.httpClient.post<number>(this.baseUrl + '/api/notif/delete',  arrayIdhash, { observe: 'body' });
  }
	
  
  markNotificationsAsRead(arrayIdhash: string[]) {
    return this.httpClient.post<number>(this.baseUrl + '/api/notif/markread',  arrayIdhash, { observe: 'body' });
  }
	
  
  markNotificationsAsUnread(arrayIdhash: string[]) {
    return this.httpClient.post<number>(this.baseUrl + '/api/notif/markunread',  arrayIdhash, { observe: 'body' });
  }
  











  /* Websockets */

  



  private socket$: WebSocketSubject<any>;


  public connect(): WebSocketSubject<any> {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket({"url": "ws://localhost:8889", deserializer: e => e.data});

      let subsc = this.socket$.asObservable().subscribe(
        msg => console.log('websocket message received: ' + msg), // Called whenever there is a message from the server.
        err =>  {
          console.log('erreur websocket', err); // Called if at any point WebSocket API signals some kind of error.
          this.socket$ = null;
        },
        () => console.log('websocket complete') // Called when connection is closed (for whatever reason).
      );


      console.log('websocket subscription', subsc);


    }
    else {
      console.log('using exisiting socket...');
    }
    return this.socket$;
  }

  sendMessage(msg: any) {
     this.connect().next(msg);
  }

  closeConnection() {
    this.connect().complete();
  }

  
}
