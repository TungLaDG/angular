import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  imports: [CommonModule,FormsModule],
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  phone_number: string = '';
  confirmPassword: string = '';
  role: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      phone_number: this.phone_number,
    };

    this.userService.createUser(newUser).subscribe(
      response => {
        console.log('User created successfully:', response);
        this.goToLogin();
      },
      error => {
        console.error('Error creating user:', error);
      }
    );
  }

  goToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}