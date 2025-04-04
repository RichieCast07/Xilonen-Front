import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-tempetura',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './tempetura.component.html',
  styleUrl: './tempetura.component.css'
})
export class TempeturaComponent implements AfterViewInit, OnDestroy {
  private chart: ApexCharts | undefined;

  ngAfterViewInit(): void {
    const chartElement = document.querySelector('#chart');
    if (!chartElement) return;

    const options = {
      series: [
        {
          name: 'Temperatura',
          data: [
            { x: new Date('2025-04-01T00:00:00').getTime(), y: 20 },
            { x: new Date('2025-04-01T03:00:00').getTime(), y: 22 },
            { x: new Date('2025-04-01T06:00:00').getTime(), y: 25 },
            { x: new Date('2025-04-01T09:00:00').getTime(), y: 28 },
            { x: new Date('2025-04-01T12:00:00').getTime(), y: 30 },
            { x: new Date('2025-04-01T15:00:00').getTime(), y: 29 },
            { x: new Date('2025-04-01T18:00:00').getTime(), y: 27 },
            { x: new Date('2025-04-01T21:00:00').getTime(), y: 24 }
          ]
        }
      ],
      chart: {
        type: 'line', 
        height: 350,
        background: 'transparent',
        zoom: {
          enabled: true, 
          type: 'x', 
          autoScaleYaxis: true 
        },
        toolbar: {
          show: false 
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth' 
      },
      title: {
        text: '',
        align: 'center',
        style: {
          color: '#42BE65', 
          fontSize: '16px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'bold'
        }
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false,
          style: {
            colors: '#ffffff', 
            fontSize: '12px',
            fontFamily: 'Roboto, sans-serif'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#ffffff', 
            fontSize: '12px',
            fontFamily: 'Roboto, sans-serif'
          }
        }
      },
      tooltip: {
        enabled: false 
      },
      markers: {
        size: 0 
      },
      colors: ['#42BE65']
    };

    this.chart = new ApexCharts(chartElement, options);
    this.chart.render();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}