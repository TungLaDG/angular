import { LoginComponent } from './login/login.component';
import { Routes,RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './services/auth.guard';
import { RegisterComponent } from './register/register.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard]  },
    { path: 'register', component: RegisterComponent },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }