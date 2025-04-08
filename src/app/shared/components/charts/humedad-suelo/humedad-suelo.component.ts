import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-humedad-suelo',
  standalone: true,
  imports: [],
  templateUrl: './humedad-suelo.component.html',
  styleUrl: './humedad-suelo.component.css'
})
export class HumedadSueloComponent implements OnInit, OnDestroy {
  valorHumedad: number = 0;
  fechaHora: string = '';
  private ws: WebSocket | undefined;

  ngOnInit(): void {
    this.ws = new WebSocket('ws://54.81.17.2:8080/ws'); 

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.tipo === 'Humedad') {
          this.valorHumedad = data.valor;
          this.fechaHora = this.formatearFecha(data.fecha_hora);
        }
      } catch (error) {
        console.error('❌ Error al procesar el mensaje del WebSocket:', error);
      }
    };

    this.ws.onerror = (err) => {
      console.error('❌ Error de WebSocket:', err);
    };
  }

  ngOnDestroy(): void {
    this.ws?.close();
  }

  formatearFecha(fechaString: string): string {
    const fecha = new Date(fechaString);
    const ahora = new Date();
    const diferenciaMin = Math.floor((ahora.getTime() - fecha.getTime()) / 60000);

    if (diferenciaMin < 1) return 'Hace unos segundos';
    if (diferenciaMin === 1) return 'Hace 1 minuto';
    return `Hace ${diferenciaMin} minutos`;
  }
}
