import { Component } from '@angular/core';

@Component({
  selector: 'app-manual',
  standalone: false,
  templateUrl: './manual.component.html',
  styleUrl: './manual.component.css'
})
export class ManualComponent {
  //url el pdf que vamoas a utilizar
  pdfSrc: string = 'assets/pdf/Manual-Xilonen.pdf'; 

  onError(error: any) {
    console.error('Error al cargar PDF:', error);
  }
}
