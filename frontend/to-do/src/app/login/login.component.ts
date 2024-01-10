import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

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
        // Handle successful login, you might store the token or redirect to another page
        console.log('Login successful', response);
      },
      (error) => {
        // Handle login error, show a message, etc.
        console.log('hello');
        console.error('Login error', error);
      }
    );
  }
}
