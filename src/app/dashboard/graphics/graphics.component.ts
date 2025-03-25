import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-graphics',
  standalone: false,
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.css'
})
export class GraphicsComponent implements AfterViewInit {
  @ViewChild('uvChart', { static: false }) uvChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('tempHumChart', { static: false }) tempHumChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('airChart', { static: false }) airChartRef!: ElementRef<HTMLCanvasElement>;

  uvChart!: Chart;
  tempHumChart!: Chart;
  airChart!: Chart;

  ngAfterViewInit(): void {
    this.initUvChart();
    this.initTempHumChart();
    this.initAirChart();
  }

  initUvChart(): void {
    this.uvChart = new Chart(this.uvChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        datasets: [
          {
            label: 'Detección UV (mW/cm²)',
            data: [10, 20, 15, 30, 40, 35, 50, 60, 55, 70, 85, 90, 100, 75, 60, 50, 40, 35, 25, 20, 15, 10, 5, 0],
            borderColor: '#33ff77',
            backgroundColor: 'rgba(51, 255, 119, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#fff' }, grid: { color: '#333' } },
          y: { ticks: { color: '#fff' }, grid: { color: '#333' } }
        }
      }
    });
  }

  initTempHumChart(): void {
    this.tempHumChart = new Chart(this.tempHumChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['12:00', '12:15', '12:30', '12:45', '13:00', '13:15'],
        datasets: [
          {
            label: 'Temperatura (°F)',
            data: [82, 83, 84, 83, 84, 85],
            borderColor: '#33ff77',
            backgroundColor: 'rgba(51, 255, 119, 0.1)',
            yAxisID: 'y1',
            tension: 0.4
          },
          {
            label: 'Humedad (%)',
            data: [50, 52, 53, 51, 52, 52],
            borderColor: '#3399ff',
            backgroundColor: 'rgba(51, 153, 255, 0.1)',
            yAxisID: 'y2',
            tension: 0.4
          }
        ]
      },
      options: {
        plugins: { legend: { labels: { color: '#fff' } } },
        scales: {
          x: { ticks: { color: '#fff' }, grid: { color: '#333' } },
          y1: { type: 'linear', position: 'left', ticks: { color: '#fff' }, grid: { color: '#333' } },
          y2: { type: 'linear', position: 'right', ticks: { color: '#fff' }, grid: { drawOnChartArea: false } }
        }
      }
    });
  }

  initAirChart(): void {
    this.airChart = new Chart(this.airChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7'],
        datasets: [
          {
            label: 'Calidad del aire (%)',
            data: [90, 88, 87, 89, 90, 88, 87],
            backgroundColor: '#33ff77'
          }
        ]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#fff' }, grid: { color: '#333' } },
          y: { ticks: { color: '#fff' }, grid: { color: '#333' }, beginAtZero: true }
        }
      }
    });
  }
}
