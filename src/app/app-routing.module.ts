import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { SubmittedTransactionComponent } from './submitted-transaction/submitted-transaction.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "create-transaction",
    component: NewTransactionComponent
  },
  {
    path: "submitted-transactions",
    component: SubmittedTransactionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
