import { Component } from '@angular/core';
import { TempeturaComponent } from '../../../../shared/components/charts/tempetura/tempetura.component';
import { TanqueAguaComponent } from '../../../../shared/components/charts/tanque-agua/tanque-agua.component';
import { TemperaturaHumedadComponent } from '../../../../shared/components/charts/temperatura-humedad/temperatura-humedad.component';
import { HumedadSueloComponent } from '../../../../shared/components/charts/humedad-suelo/humedad-suelo.component';
import { CalidadAireComponent } from '../../../../shared/components/charts/calidad-aire/calidad-aire.component';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  imports: [TempeturaComponent, TanqueAguaComponent, HumedadSueloComponent, TemperaturaHumedadComponent, CalidadAireComponent],
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent { }