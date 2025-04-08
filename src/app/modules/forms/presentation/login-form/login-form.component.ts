import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  constructor(private router: Router) {}

  onLoginSubmit(): void {
    this.router.navigate(['/home']); 
  }

  onRegisterClick(): void {
    this.router.navigate(['/register']);
  }
}
