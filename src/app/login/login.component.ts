import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [ FormsModule ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  registering: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      response => {
        this.router.navigate(['/users']);
      },
      error => {
        console.error('Error logging in', error);
      }
    );
  }

  goToRegister(): void {
    this.router.navigateByUrl('/register');
  }
}
