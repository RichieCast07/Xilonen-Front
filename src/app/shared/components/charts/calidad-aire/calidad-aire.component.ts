import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-calidad-aire',
  templateUrl: './calidad-aire.component.html',
  styleUrls: ['./calidad-aire.component.css']
})
export class CalidadAireComponent implements OnInit {
  private chart: Chart | undefined;
  private socket: WebSocket | undefined;

  ngOnInit(): void {
    Chart.register(...registerables);
    this.createSimpleChart();
    this.initWebSocket(); // <-- conectar WebSocket al iniciar
  }

  // Crea la gráfica inicial
  createSimpleChart(): void {
    const ctx = document.getElementById('aireChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [], // ← empezamos vacío
        datasets: [{
          label: 'Calidad del Aire (MQ135)',
          data: [],
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
            min: 0,
            max: 5000,
            ticks: {
              color: '#ffffff'
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

  // Conexión al WebSocket
  initWebSocket(): void {
    this.socket = new WebSocket('ws://localhost:8080/ws'); // Cambia si tu puerto/host es diferente

    this.socket.onopen = () => {
      console.log('✅ WebSocket conectado');
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.tipo === 'MQ135') {
          this.updateChart(data);
        }
      } catch (error) {
        console.error('❌ Error al parsear el mensaje:', error);
      }
    };

    this.socket.onerror = (error) => {
      console.error('❌ Error en WebSocket:', error);
    };

    this.socket.onclose = () => {
      console.warn('⚠️ WebSocket desconectado');
    };
  }

  // Agregar nuevo dato a la gráfica
  updateChart(data: any): void {
    if (this.chart) {
      const label = new Date(data.fecha_hora).toLocaleTimeString();
      const value = data.valor;
  
      this.chart.data.labels?.push(label);
      this.chart.data.datasets[0].data.push(value);
  
      // Limita a los últimos 10 puntos
      if (this.chart.data.labels!.length > 10) {
        this.chart.data.labels!.shift();
        this.chart.data.datasets[0].data.shift();
      }
  
      this.chart.update();
  
      // 🟢 Actualiza la tarjeta con último valor
      const valorElem = document.getElementById('ultimoValor');
      const horaElem = document.getElementById('ultimaHora');
  
      if (valorElem && horaElem) {
        valorElem.textContent = `${value}`;
        horaElem.textContent = new Date(data.fecha_hora).toLocaleString();
      }
    }
  }
  
}
//ok