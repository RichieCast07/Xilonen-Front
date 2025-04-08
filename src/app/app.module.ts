import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./shared/components/layout/header/header.component";
import { NgApexchartsModule } from 'ng-apexcharts';
import { RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './modules/dashboard/presentation/dashboard-home/dashboard-home.component';
import { ReportListComponent } from './modules/reports/presentation/report-list/report-list.component';
import { TempeturaComponent } from './shared/components/charts/tempetura/tempetura.component';
@NgModule({
  declarations: [
    AppComponent,
    ReportListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule,
    HeaderComponent,
    RouterModule,
    TempeturaComponent,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
