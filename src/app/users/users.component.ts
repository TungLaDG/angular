import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  imports: [CommonModule,FormsModule],
  standalone: true,
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  newUser: any = { name: '', email: '', password: '', phone_number: '', role: '' };
  updateUser: any = null;
  showAddForm: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      response => {
        this.users = response.data;
      },
      error => {
        console.error('Error fetching users', error);
      }
    );
  }

  addUserForm(): void {
    this.showAddForm = true; // Hiển thị form Add User
    this.updateUser = null; // Đặt lại updateUser về null để tránh hiển thị form Update ngay khi submit Add
  }

  addUser(): void {
    this.userService.createUser(this.newUser).subscribe(
      response => {
        this.loadUsers(); // Reload users after adding
        this.newUser = { name: '', email: '', password: '', phone_number: '', role: '' }; // Clear form fields
        
      },
      error => {
        console.error('Error adding user', error);
      }
    );
  }
  
  prepareUpdate(user: any): void {
    this.updateUser = { ...user }; // Copy user object to updateUser
    this.showAddForm = false; // Ẩn form Add User khi chuẩn bị cập nhật
  }

  updateUserAction(): void {
    if (this.updateUser) {
      const { id, email, ...updatePayload } = this.updateUser; 
      console.log('Updating user with data:', updatePayload);
      this.userService.updateUser(id, updatePayload).subscribe(
        response => {
          this.loadUsers(); 
          this.updateUser = null; 
        },
        error => {
          console.error('Error updating user', error);
        }
      );
    }
  }
  
  

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(
      response => {
        this.loadUsers(); 
      },
      error => {
        console.error('Error deleting user', error);
      }
    );
  }
}
