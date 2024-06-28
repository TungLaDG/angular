import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserService } from '../../services/browser.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router, private browserService: BrowserService) {}

  ngOnInit(): void {
    if (this.browserService.isBrowser()) {
    }
  }

  logout() {
    this.authService.logout();
    if (this.browserService.isBrowser()) {
      window.location.href = '';
    }
  }

 }
