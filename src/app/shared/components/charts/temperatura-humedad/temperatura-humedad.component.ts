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
  @ViewChild('chart2', { static: true }) chart2Element!: ElementRef;

  private chart2: ApexCharts | undefined;
  private ws: WebSocket | undefined;

  private humedadData: { x: number; y: number }[] = [];

  private getChartOptions(id: string, title: string, data: any[], color: string) {
    return {
      chart: {
        id,
        type: 'line',
        height: '160px',
        width: '100%',
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
        x: { format: 'HH:mm:ss' }
      },
      colors: [color]
    };
  }

  ngAfterViewInit(): void {
    this.chart2 = new ApexCharts(
      this.chart2Element.nativeElement,
      this.getChartOptions('humedad-chart', 'Humedad de Suelo', this.humedadData, '#008626')
    );

    this.chart2.render();

    this.ws = new WebSocket('ws://localhost:8080/ws'); 

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.tipo === 'Humedad') {
          const punto = {
            x: new Date(data.fecha_hora).getTime(),
            y: data.valor
          };

          this.humedadData.push(punto);

          if (this.humedadData.length > 20) {
            this.humedadData.shift();
          }

          this.chart2?.updateSeries([{ data: this.humedadData }]);
        }
      } catch (err) {
        console.error('❌ Error procesando mensaje del WebSocket:', err);
      }
    };

    this.ws.onerror = (err) => {
      console.error('❌ Error en conexión WebSocket:', err);
    };
  }

  ngOnDestroy(): void {
    this.chart2?.destroy();
    this.ws?.close();
  }
}
