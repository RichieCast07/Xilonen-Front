import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TempeturaComponent } from './components/charts/tempetura/tempetura.component';
import { TemperaturaHumedadComponent } from './components/charts/temperatura-humedad/temperatura-humedad.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    TempeturaComponent,
    TemperaturaHumedadComponent
  ]
})
export class SharedModule { }
