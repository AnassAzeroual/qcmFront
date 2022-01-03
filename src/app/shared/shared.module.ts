import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HasAnyAuthorityDirective } from './directives/has-any-authority.directive';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ConfirmComponent } from './confirm/confirm.component';
import { InputReaderComponent } from './input-reader/input-reader.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import {
    NgbAlertModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbToastModule,
    NgbModalModule,
    NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap';
import { Decimal2CorrectDirective } from './directives/decimal2-correct.directive';
import { AutoApplyAuthoritiesDirective } from './directives/auto-apply-authorities.directive';

import { TruncatePipe } from './pipe/truncate.pipe';

import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './my-rx-stomp.config';
import { FormReadonlyModeDirective } from './directives/form-readonly-mode.directive';


import { TypeaheadScrollFixDirective } from './directives/typeahead-scroll-fix.directive';
import { ValidationOnBlurDirective } from './directives/validation-on-blur.directive';

import { NgxNoCopyModule } from "ngx-no-copy";
@NgModule({
    declarations: [
        HasAnyAuthorityDirective, LoaderComponent, AlertComponent, ConfirmComponent, InputReaderComponent,
        NotificationsComponent, PdfViewerComponent, AccountEditComponent, Decimal2CorrectDirective, AutoApplyAuthoritiesDirective,
        TruncatePipe,
        FormReadonlyModeDirective,
        TypeaheadScrollFixDirective, ValidationOnBlurDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbAlertModule, NgbPaginationModule, NgbTypeaheadModule, NgbToastModule, NgbModalModule, NgbDropdownModule,
        SharedRoutingModule,NgxNoCopyModule
    ],
    exports: [
        HasAnyAuthorityDirective, LoaderComponent, AlertComponent, PdfViewerComponent, Decimal2CorrectDirective,
        AutoApplyAuthoritiesDirective, TruncatePipe, FormReadonlyModeDirective,
        TypeaheadScrollFixDirective, ValidationOnBlurDirective,NgxNoCopyModule
    ],
    entryComponents: [
        ConfirmComponent, InputReaderComponent
    ],
    providers: [
        {
            provide: InjectableRxStompConfig,
            useValue: myRxStompConfig
        },
        {
            provide: RxStompService,
            useFactory: rxStompServiceFactory,
            deps: [InjectableRxStompConfig]
        }
    ],

})
export class SharedModule { }
