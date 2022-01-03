import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatMessage } from './chat.model';
import { chatMessages } from './data';

@Component({
  selector: 'app-widget-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chatMessages: ChatMessage[] = [];
  newMessage: string = "";
  submitted: boolean = false;

  @ViewChild('chatForm', { static: true }) chatForm!: any;
  constructor () { }

  ngOnInit(): void {
    this._fetchData();
  }

  /**
   * fetches messages
   */
  _fetchData(): void {
    this.chatMessages = chatMessages;
  }

  /**
   * adds new message to chat messages
   */
  sendMessage(): void {
    this.submitted = true;
    if (this.newMessage !== '') {
      var today = new Date();
      const newChatMessage: ChatMessage = {
        id: this.chatMessages.length + 1,
        sender: {
          name: 'Dominic',
          avatar: 'assets/images/users/avatar-5.jpg'
        },
        time: today.getHours() + ":" + today.getMinutes(),
        message: this.newMessage
      }

      this.chatMessages.push(newChatMessage);

      this.chatForm.resetForm();
    }
  }



}
