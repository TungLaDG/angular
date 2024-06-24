import { Routes,RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';



export const routes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: 'products', component: ProductsComponent }

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }