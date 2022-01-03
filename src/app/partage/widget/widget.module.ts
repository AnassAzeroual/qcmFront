import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics/statistics.component';
import { ChartStatisticsComponent } from './chart-statistics/chart-statistics.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TodoComponent } from './todo/todo.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { PreloaderComponent } from './preloader/preloader.component';
import { MessagesComponent } from './messages/messages.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartComponent } from './chart/chart.component';
import { ChatComponent } from './chat/chat.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { ChartStatistics2Component } from './chart-statistics2/chart-statistics2.component';
import { FormsModule } from '@angular/forms';
import { TransactionComponent } from './transaction/transaction.component';
import { VectormapComponent } from './vectormap/vectormap.component';
import { WorldMapComponent } from './vectormap/world-map/world-map.component';
import { CanadaMapComponent } from './vectormap/canada-map/canada-map.component';
import { RussiaMapComponent } from './vectormap/russia-map/russia-map.component';
import { SpainMapComponent } from './vectormap/spain-map/spain-map.component';
import { IraqMapComponent } from './vectormap/iraq-map/iraq-map.component';
import { ItalyMapComponent } from './vectormap/italy-map/italy-map.component';
import { UsaMapComponent } from './vectormap/usa-map/usa-map.component';
import { PricingCardComponent } from './pricing-card/pricing-card.component';
import { FaqComponent } from './faq/faq.component';



@NgModule({
  declarations: [
    StatisticsComponent,
    ChartStatisticsComponent,
    TodoComponent,
    PreloaderComponent,
    MessagesComponent,
    ChartComponent,
    ChatComponent,
    UserProfileComponent,
    RecentActivityComponent,
    ChartStatistics2Component,
    TransactionComponent,
    VectormapComponent,
    WorldMapComponent,
    CanadaMapComponent,
    RussiaMapComponent,
    SpainMapComponent,
    IraqMapComponent,
    ItalyMapComponent,
    UsaMapComponent,
    PricingCardComponent,
    FaqComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    NgApexchartsModule
  ],
  exports: [
    StatisticsComponent,
    ChartStatisticsComponent,
    TodoComponent,
    PreloaderComponent,
    MessagesComponent,
    ChartComponent,
    ChatComponent,
    UserProfileComponent,
    RecentActivityComponent,
    ChartStatistics2Component,
    TransactionComponent,
    VectormapComponent,
    WorldMapComponent,
    CanadaMapComponent,
    RussiaMapComponent,
    SpainMapComponent,
    IraqMapComponent,
    ItalyMapComponent,
    UsaMapComponent,
    PricingCardComponent,
    FaqComponent,
  ],
})
export class WidgetModule { }
