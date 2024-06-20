import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-costumer',
  templateUrl: './new-costumer.component.html',
  styleUrl: './new-costumer.component.css'
})
export class NewCostumerComponent implements OnInit{
  newCustomerFormGroup! : FormGroup;
  constructor(private fb : FormBuilder,
              private customerService: CustomerService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name : this.fb.control(null,[Validators.required, Validators.minLength(3)]),
      email : this.fb.control(null,[Validators.required, Validators.email]),
    })
  }

  addCustomer() {
    let customer:Customer = this.newCustomerFormGroup.value;
    this.customerService.addCustomer(customer).subscribe({
        next: (data) => {
          alert('Customer added successfully');
          this.router.navigateByUrl('/customers');
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }
}
