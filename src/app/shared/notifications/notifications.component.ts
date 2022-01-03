import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';


import {NotificationService} from '../services/notification.service';
import {AlertService} from '../services/alert.service';
import {INotification} from '../models/notification.model';
import {UserInputService} from '../services/user-input.service';

import {environment} from 'src/environments/environment';


@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {


    unread: boolean = null;

    notifs: any;
    sub: any;
    selected: boolean[];

    idhash: string;
    oneNotification: INotification;


    constructor(private notificationService: NotificationService,
                private alertService: AlertService,
                private router: Router,
                private route: ActivatedRoute,
                private _location: Location,
                private userInputService: UserInputService, ) {
    }


    ngOnInit() {
        // console.log('NotificationsComponent  ngOnInit');

        // this.sub = interval(10000)
        // 		.subscribe((val) => {
        // 			 let test = this.notificationService.refreshUnread(1);
        // 			 console.log(this.notificationService.unreadnotifs); });
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.idhash = params.idhash;

                    if (this.idhash && this.idhash !== 'unread') {			//  one notification
                        this.unread = null;
                    } else if (this.idhash === 'unread') {			// all unread
                        this.unread = true;
                    } else {			// all
                        this.unread = false;
                    }


                    this.loadValues(1);
                }
            );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


    loadValues(pageNumber: number) {

        if (this.unread === null) {		//  one notification
            this.notificationService.readNotificationById(this.idhash)
                .subscribe(
                    (data: any) => {
                        this.oneNotification = data;
                        this.notificationService.refreshUnread(environment.max_menu_notifs);	// force refresh header
                    }
                );
        } else if (this.unread === true) {		//  all unread
            this.notificationService.getMyUnreadNotifications(pageNumber - 1, 10).subscribe(
                (data) => {
                    this.notifs = data;
                    this.initSelected();
                    this.oneNotification = null;
                }
            );
        } else {			// all
            this.notificationService.getAllMyNotifications(pageNumber - 1, 10).subscribe(
                (data) => {
                    this.notifs = data;
                    this.initSelected();
                    this.oneNotification = null;
                }
            );
        }
    }


    initSelected() {
        this.selected = [];

        if (this.notifs && this.notifs.content && this.notifs.content.length) {
            for (let i = 0; i < this.notifs.content.length; i++) {
                this.selected.push(false);
            }
        }
    }

    buildArraySelectedIdhash() {
        let arrayIdhash = [];

        if (this.notifs && this.notifs.content && this.notifs.content.length) {
            arrayIdhash = this.notifs.content.filter((elem, index) => this.selected[index]).map(elem => elem.idhash);
        }

        return arrayIdhash;
    }


    changeAllSelectNotif(event) {
        for (let i = 0; i < this.selected.length; i++) {
            this.selected[i] = event.target.checked;
        }
    }


    onDeleteNotifs() {
        this.userInputService.confirm(null, null).then(
            (result) => {
                this.notificationService.deleteNotifications(this.buildArraySelectedIdhash()).subscribe(
                    (num) => {
                        this.alertService.info(num + ' Notification(s) Deleted');
                        this.loadValues(1);
                        this.notificationService.refreshUnread(environment.max_menu_notifs);	// force refresh header
                    });
            },
            (reason) => {
            }
        );
    }


    onMarkNotifsAsRead() {
        // console.log(this.selected);

        this.notificationService.markNotificationsAsRead(this.buildArraySelectedIdhash()).subscribe(
            (num) => {
                this.alertService.info(num + ' Notification(s) Marked As Read');
                this.loadValues(1);
                this.notificationService.refreshUnread(environment.max_menu_notifs);	// force refresh header
            });
    }


    onMarkNotifsAsUnread() {
        // console.log(this.selected);

        this.notificationService.markNotificationsAsUnread(this.buildArraySelectedIdhash()).subscribe(
            (num) => {
                this.alertService.info(num + ' Notification(s) Marked As Unread');
                this.loadValues(1);
                this.notificationService.refreshUnread(environment.max_menu_notifs);	// force refresh header
            });
    }


    onNextNotification() {
        this.notificationService.getNextNotificationId(this.idhash)
            .subscribe(
                (nextId: any) => {
                    if (nextId) {
                        this.router.navigate(['/', 'notifications', nextId]);
                    } else {
                        this.alertService.info('There is no other notification');
                    }
                }
            );
    }

    onPreviousNotification() {
        this.notificationService.getPreviousNotificationId(this.idhash)
            .subscribe(
                (prevId: any) => {
                    if (prevId) {
                        this.router.navigate(['/', 'notifications', prevId]);
                    } else {
                        this.alertService.info('There is no other notification');
                    }
                }
            );
    }


    onBack() {
        this._location.back();
    }

}
