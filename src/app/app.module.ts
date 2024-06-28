import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthInterceptorService } from './services/authinterceptor.service';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: []
})
export class AppModule { }
