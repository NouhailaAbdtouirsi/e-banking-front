import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers! : Observable<Array<Customer>>;
  errorMessage! : string;
  searchFormGroup! : FormGroup | undefined;
  constructor(private http: HttpClient,
              private customerService: CustomerService,
              private fb:FormBuilder,
              private router: Router) {
  }
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control('')
    });
    this.search();
  }
  search() {
    let keyword = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(keyword).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  delete(customer: Customer) {
    let confirmDelete = confirm('Are you sure you want to delete this customer?');
    if (!confirmDelete) {
      return;
    }
    this.customerService.deleteCustomer(customer.id).subscribe({
      next: (data) => {
        this.customers = this.customers.pipe(
          map(data=>{
            let index = data.indexOf(customer);
            data.slice(index,1);
            return data;
          })
        );
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  customerAccounts(cus: Customer) {
    this.router.navigateByUrl('/admin/customer-accounts/' + cus.id, {state: {customer: cus}})
  }
}
