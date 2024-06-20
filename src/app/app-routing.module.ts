import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCostumerComponent} from "./new-costumer/new-costumer.component";

const routes: Routes = [
  { path : "customers",component: CustomersComponent},
  { path : "",redirectTo: "/customers",pathMatch: "full"},
  { path:"accounts",component:AccountsComponent},
  { path : "new-customer",component: NewCostumerComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
