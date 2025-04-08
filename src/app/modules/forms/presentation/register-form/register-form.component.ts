import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: false,
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  constructor(private router: Router) {}

  onRegisterClick(): void {
    this.router.navigate(['/home']); 
  }

  onLoginClick(): void {
    this.router.navigate(['/login']); 
  }
}
