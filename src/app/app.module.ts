import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from './layouts/layout.module';
import { RouteReuseStrategy } from '@angular/router';
import { NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from './shared/services/custom-date-parser-formatter';
import { GlobalErrorHandler } from './shared/services/global.error.handler';
import { AppHttpInterceptor } from './shared/services/http-interceptor';
import { NgbDateMomentAdapter } from './shared/services/ngb-date-moment-adaptater';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { PagerModule } from '@progress/kendo-angular-pager';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { PopupModule } from '@progress/kendo-angular-popup';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { MessageService } from '@progress/kendo-angular-l10n';
import { MyMessageService } from './MessageService';
import { CacheRouteReuseStrategy } from './cache-route-reuse-strategy';
import { GridModule } from '@progress/kendo-angular-grid';
import { registerLocaleData } from '@angular/common';
import * as moment from 'moment';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);
moment.fn.toJSON = function () {
  return this.format('YYYY-MM-DD HH:mm:ss');
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    QuillModule.forRoot(),
    LayoutModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    DropDownsModule,
    ExcelExportModule,
    InputsModule,
    PagerModule,
    PDFExportModule,
    PopupModule,
    TooltipModule,
    GridModule,
  ],
  providers: [
    Title,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    { provide: NgbDateAdapter, useClass: NgbDateMomentAdapter },
    { provide: MessageService, useClass: MyMessageService },
    {
      provide: RouteReuseStrategy,
      useClass: CacheRouteReuseStrategy
    }

    // CookieService,
    // { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
