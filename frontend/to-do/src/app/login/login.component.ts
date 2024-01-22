import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService) {}

  onUsernameInput(event: any) {
    console.log('Username input event:', event.target.value);
  }

  onPasswordInput(event: any) {
    console.log('Password input event:', event.target.value);
  }

  login() {
    console.log(this.credentials);
    this.authService.login(this.credentials).subscribe(
      (response) => {
        const token = response.idToken;
        localStorage.setItem('token', token);
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }
}
