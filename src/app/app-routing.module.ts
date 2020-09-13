import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },

  //{ path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'productlist', component: ProductListComponent },
  // { path: '', component: ProductDetailComponent },
  { path: 'productdetail', component: ProductDetailComponent },
  { path: '', redirectTo: 'productdetail', pathMatch: 'full' },
  { path: 'productdetail/:id', component: ProductDetailComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
