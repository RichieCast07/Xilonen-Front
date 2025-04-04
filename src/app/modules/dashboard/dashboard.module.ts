import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DashboardHomeComponent } from './presentation/dashboard-home/dashboard-home.component';
import { TempeturaComponent } from '../../shared/components/charts/tempetura/tempetura.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    TempeturaComponent,
    DashboardHomeComponent
  ]
})

export class DashboardModule { }
