import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrintService {



  baseUrl = "http://localhost:8888/periphwpAPI/v1.0";




  constructor(private httpClient: HttpClient) { }
  // constructor() { }
  
  
  

  print(content: any) {
    return this.httpClient.post<any>(this.baseUrl + '/printstring',         {'contentToPrint': content, 'fontFamilyName': 'Arial', 'fontSize': 30, 'printerName': 'PDFCreator'}      , { observe: 'body' });
  }

  


  
  







  // codes examples

   //, private printService: PrintService, private rxStompService: RxStompService  






   

    // console.log('websocket subscribe ...........');
    // this.printService.connect().asObservable().subscribe(
    //   msg => console.log('websocket message received: ' + msg), // Called whenever there is a message from the server.
    //   err => console.log('erreur websocket', err), // Called if at any point WebSocket API signals some kind of error.
    //   () => console.log('websocket complete') // Called when connection is closed (for whatever reason).
    // );







// this.topicSubscription = this.rxStompService.watch('/testTopic/message').subscribe((message: any) => {
    //   console.log('received message: ', message.body);
    // });

    // this.rxStompService.publish({destination: '/app/send/message', body: "test message body!!!"});
  // }

  // private topicSubscription: Subscription;
  
  // ngOnDestroy() {
  //   this.topicSubscription.unsubscribe();
  // }








  // const text = await data.text();
  // console.log(text);
  //var byteArray = new Uint8Array(data);

  // this.printService.test("12314567").subscribe(
  //   (retour) => {
  //     console.log('test retour', retour);
  //   }
  // );



  
  // this.printService.printContent("toto");


//const blobUrrl = URL.createObjectURL(data);
// this.blobUrl = data;
//const iframe = document.createElement('iframe');


}
