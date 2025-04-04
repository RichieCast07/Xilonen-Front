import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-calidad-aire',
  imports: [],
  templateUrl: './calidad-aire.component.html',
  styleUrl: './calidad-aire.component.css'
})
export class CalidadAireComponent implements OnInit {
  ngOnInit(): void {
    Chart.register(...registerables);
    this.createSimpleChart();
  }

  createSimpleChart(): void {
    const ctx = document.getElementById('aireChart') as HTMLCanvasElement;
    const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const calidadAire = [72, 75, 78, 74, 70, 68, 73]; 

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dias,
        datasets: [{
          label: 'Calidad del Aire (%)',
          data: calidadAire,
          fill: true,
          backgroundColor: 'rgba(46, 204, 113, 0.2)',
          borderColor: 'rgba(46, 204, 113, 1)',
          borderWidth: 2,
          tension: 0.3,
          pointBackgroundColor: 'rgba(46, 204, 113, 1)',
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            min: 60,
            max: 85,
            ticks: {
              color: '#ffffff',
              stepSize: 5
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#ffffff'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#ffffff',
              boxWidth: 0,
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: 'rgba(46, 204, 113, 1)',
            borderWidth: 1
          }
        }
      }
    });
  }
}