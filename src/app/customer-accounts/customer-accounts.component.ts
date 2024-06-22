import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import {AccountsService} from "../services/accounts.service";
import {Account} from "../model/account.model";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.css'
})
export class CustomerAccountsComponent implements OnInit {
  customerID!: number;
  customerAccounts!: Account[];
  constructor(private route:ActivatedRoute,
              private router:Router,
              private accountService: AccountsService) {
  }

  ngOnInit() {
    this.customerID = this.route.snapshot.params['customerID'];
    this.accountService.accountByCustomer(this.customerID).subscribe({
      next: (data) => {
        console.log(data);
        this.customerAccounts = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
    }
}
