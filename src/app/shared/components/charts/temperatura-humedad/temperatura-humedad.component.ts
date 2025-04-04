import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-temperatura-humedad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './temperatura-humedad.component.html',
  styleUrl: './temperatura-humedad.component.css'
})

export class TemperaturaHumedadComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chart1', { static: true }) chart1Element!: ElementRef;
  @ViewChild('chart2', { static: true }) chart2Element!: ElementRef;

  private chart1: ApexCharts | undefined;
  private chart2: ApexCharts | undefined;

  private getChartOptions(id: string, title: string, data: any[], color: string) {
    return {
      chart: {
        id,
        type: 'line',
        height: '160px',
        width: '500px',
        group: 'sync-charts',
        toolbar: { show: false }
      },
      title: {
        text: title,
        align: 'center',
        style: {
          color: '#ffffff',
          fontSize: '16px'
        }
      },
      series: [{ data }],
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: '#ffff', 
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#ffff', 
            fontSize: '12px'
          }
        }
      },
      stroke: { curve: 'smooth' },
      dataLabels: { enabled: false },
      tooltip: {
        x: { format: 'HH:mm' }
      },
      colors: [color]
    };
  }

  ngAfterViewInit(): void {
    const tempData = [
      { x: new Date('2025-04-01T00:00:00').getTime(), y: 20 },
      { x: new Date('2025-04-01T06:00:00').getTime(), y: 22 },
      { x: new Date('2025-04-01T12:00:00').getTime(), y: 30 },
      { x: new Date('2025-04-01T18:00:00').getTime(), y: 25 },
      { x: new Date('2025-04-01T23:59:00').getTime(), y: 21 }
    ];

    const humedadData = [
      { x: new Date('2025-04-01T00:00:00').getTime(), y: 50 },
      { x: new Date('2025-04-01T06:00:00').getTime(), y: 55 },
      { x: new Date('2025-04-01T12:00:00').getTime(), y: 60 },
      { x: new Date('2025-04-01T18:00:00').getTime(), y: 58 },
      { x: new Date('2025-04-01T23:59:00').getTime(), y: 53 }
    ];

    this.chart1 = new ApexCharts(
      this.chart1Element.nativeElement, 
      this.getChartOptions('temperatura-chart', 'Temperatura', tempData, '#42BE65')
    );
    
    this.chart2 = new ApexCharts(
      this.chart2Element.nativeElement, 
      this.getChartOptions('humedad-chart', 'Humedad de Suelo', humedadData, '#008626')
    );

    this.chart1.render();
    this.chart2.render();
  }

  ngOnDestroy(): void {
    this.chart1?.destroy();
    this.chart2?.destroy();
  }
}