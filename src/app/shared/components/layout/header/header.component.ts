import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showNotifications = false;

  notifications = [
    { title: 'Nuevo reporte disponible', time: 'Hace 5 minutos' }
  ];

  constructor(private router: Router) {}

  get isDashboard(): boolean {
    const dashboardRoutes = ['/home', '/report', '/help'];
    return dashboardRoutes.some(route => this.router.url.startsWith(route));
  }

  toggleNotifications(event: MouseEvent): void {
    event.stopPropagation();
    this.showNotifications = !this.showNotifications;
    console.log('Notifications toggled:', this.showNotifications);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const notificationsElement = document.querySelector('.notifications-dropdown');
    const bellIcon = document.querySelector('.notification-icon');

    if (this.showNotifications &&
        !notificationsElement?.contains(event.target as Node) &&
        !bellIcon?.contains(event.target as Node)) {
      this.showNotifications = false;
      console.log('Notifications closed');
    }
  }
}
