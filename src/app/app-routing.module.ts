import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCostumerComponent} from "./new-costumer/new-costumer.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthGuard} from "./guards/authentication.guard";
import {AuthorizationsGuard} from "./guards/authorization.guard";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";


const routes: Routes = [
  { path : "login",component: LoginComponent},
  { path : "",redirectTo: "/login",pathMatch: "full"},
  { path : "admin",component : AdminTemplateComponent, canActivate: [AuthGuard],
    children: [
      { path : "customers",component: CustomersComponent},
      { path:"accounts",component:AccountsComponent},
      { path : "new-customer",component: NewCostumerComponent,canActivate: [AuthorizationsGuard],data: {role: 'ADMIN'}},
      { path : "customer-accounts/:customerID",component: CustomerAccountsComponent},
      { path : "not-authorized",component: NotAuthorizedComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
