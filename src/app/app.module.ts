import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    UserService
  ],
  bootstrap: []
})
export class AppModule { }
