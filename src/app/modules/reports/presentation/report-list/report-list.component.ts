import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-report-list',
  standalone: false,
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.css'
})
export class ReportListComponent {
  // Control de visualización
  showCalendar = false;
  showMonthSelector = false;
  showYearSelector = false;
  showDownloadModal = false;
  
  // Fechas y selección
  currentDate: Date = new Date();
  selectedDate: Date = new Date();
  
  // Selectores de mes/año
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getFullYear();
  
  // Modal y reporte seleccionado
  selectedReport: any = null;
  selectedReportUrl: SafeResourceUrl | null = null;
  
  // Datos para el calendario
  monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  weekdays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  days: any[] = [];
  yearsRange: number[] = [];
  
  // Datos de ejemplo de reportes
  reports = [
    { id: 1, date: new Date(2025, 2, 25), title: 'Reporte Marzo 2025', url: 'assets/pdf/ciscoP.pdf' },
    { id: 2, date: new Date(2025, 3, 25), title: 'Reporte Abril 2025', url: 'assets/pdf/ciscoP.pdf' },
    { id: 3, date: new Date(2025, 4, 25), title: 'Reporte Mayo 2025', url: 'path/to/report3.pdf' },
    { id: 4, date: new Date(2025, 5, 25), title: 'Reporte Junio 2025', url: 'path/to/report4.pdf' },
    { id: 5, date: new Date(2025, 6, 25), title: 'Reporte Julio 2025', url: 'path/to/report5.pdf' }
  ];

  constructor(private sanitizer: DomSanitizer) {
    this.generateYearsRange();
    this.generateCalendar();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const calendarElement = document.querySelector('.calendar-dropdown');
    const calendarButton = document.querySelector('.calendar-icon');
    
    if (this.showCalendar && 
        !calendarElement?.contains(event.target as Node) && 
        !calendarButton?.contains(event.target as Node)) {
      this.closeAll();
    }
  }

  closeAll() {
    this.showCalendar = false;
    this.showMonthSelector = false;
    this.showYearSelector = false;
  }

  get filteredReports() {
    return this.reports.filter(report => 
      report.date.getMonth() === this.currentMonth && 
      report.date.getFullYear() === this.currentYear
    ).sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  generateYearsRange(): void {
    const currentYear = new Date().getFullYear();
    for (let i = -10; i <= 10; i++) {
      this.yearsRange.push(currentYear + i);
    }
  }

  toggleCalendar(event?: MouseEvent): void {
    if (event) event.stopPropagation();
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar) {
      this.showMonthSelector = false;
      this.showYearSelector = false;
    }
  }

  toggleMonthSelector(event: MouseEvent): void {
    event.stopPropagation();
    this.showMonthSelector = !this.showMonthSelector;
    if (this.showMonthSelector && this.showYearSelector) {
      this.showYearSelector = false;
    }
  }

  toggleYearSelector(event: MouseEvent): void {
    event.stopPropagation();
    this.showYearSelector = !this.showYearSelector;
    if (this.showYearSelector && this.showMonthSelector) {
      this.showMonthSelector = false;
    }
  }

  selectMonth(month: number, event: MouseEvent): void {
    event.stopPropagation();
    this.currentMonth = month;
    this.showMonthSelector = false;
    this.updateCalendar();
  }

  selectYear(year: number, event: MouseEvent): void {
    event.stopPropagation();
    this.currentYear = year;
    this.showYearSelector = false;
    this.updateCalendar();
  }

  updateCalendar(): void {
    this.currentDate = new Date(this.currentYear, this.currentMonth, 1);
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.days = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    
    const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      this.days.push({ day: prevMonthLastDay - i, inactive: true, currentMonth: false });
    }
    
    const today = new Date();
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(this.currentYear, this.currentMonth, i);
      this.days.push({
        day: i,
        date: date,
        today: this.isToday(date),
        selected: this.isSelected(date),
        currentMonth: true
      });
    }
    
    const daysShown = startDay + lastDay.getDate();
    const remainingDays = 7 - (daysShown % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        this.days.push({ day: i, inactive: true, currentMonth: false });
      }
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  }

  isSelected(date: Date): boolean {
    return date.getDate() === this.selectedDate.getDate() && 
           date.getMonth() === this.selectedDate.getMonth() && 
           date.getFullYear() === this.selectedDate.getFullYear();
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.updateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.updateCalendar();
  }

  selectDay(day: any): void {
    if (day.currentMonth && !day.inactive) {
      this.selectedDate = day.date;
      this.generateCalendar();
    }
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  viewReport(reportId: number): void {
    const report = this.reports.find(r => r.id === reportId);
    if (report) {
      this.selectedReportUrl = this.sanitizeUrl(report.url);
      console.log(`Visualizando reporte: ${report.title}`);
    }
  }

  openDownloadModal(report: any): void {
    this.selectedReport = report;
    this.showDownloadModal = true;
  }

  closeModal(): void {
    this.showDownloadModal = false;
    this.selectedReport = null;
  }

  confirmDownload(): void {
    if (this.selectedReport) {
      this.downloadReport(this.selectedReport);
      this.closeModal();
    }
  }

  downloadReport(report: any): void {
    console.log(`Descargando reporte: ${report.title}`);
    const link = document.createElement('a');
    link.href = report.url;
    link.download = `${report.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}