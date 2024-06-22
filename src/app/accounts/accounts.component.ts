import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {AccountDetails} from "../model/account.model";
import {catchError, Observable, throwError} from "rxjs";
import {AuthServiceService} from "../services/auth-service.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  accountForm!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetails> ;
  operationForm!: FormGroup;
  errorMessage!: string;
  constructor(private fb : FormBuilder,
              private accountService:AccountsService,
              public authService : AuthServiceService) {}

  ngOnInit() {
    this.accountForm = this.fb.group({
      accountID: this.fb.control('')
    })
    this.operationForm = this.fb.group({
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null)
    })
  }

  search() {
    let accountID = this.accountForm.value.accountID;
     this.accountObservable = this.accountService.getAccount(accountID, this.currentPage, this.pageSize).pipe(
       catchError((error) => {
          this.errorMessage = error.message;
          return throwError(error);
       }
     ));
  }

  goToPage(i: number) {
    this.currentPage = i;
    this.search();

  }

  accountOp() {
    let accountID = this.accountForm.value.accountID;
    let operationType = this.operationForm.value.operationType;
    let amount = this.operationForm.value.amount;
    let description = this.operationForm.value.description;
    let accountDestination = this.operationForm.value.accountDestination;
    if (operationType === 'DEBIT') {
      this.accountService.debit(accountID, amount, description).subscribe(
        {
          next: (data) => {
            alert('Debit operation successful');
            this.operationForm.reset();
            this.search();
          },
          error: (error) => {
            console.error(error);
          }
        }
      )
    } else if (operationType === 'CREDIT') {
      this.accountService.credit(accountID, amount, description).subscribe(
        {
          next: (data) => {
            alert('Credit operation successful')
            this.operationForm.reset();

            this.search();
          },
          error: (error) => {
            console.error(error);
          }
        }
      )
    } else if (operationType === 'TRANSFER') {
      this.accountService.transfer(accountID, amount, description, accountDestination).subscribe(
        {
          next: (data) => {
            alert('Transfer operation successful')
            this.operationForm.reset();

            this.search();
          },
          error: (error) => {
            console.error(error);
          }
        }
      )
    }

  }

  protected readonly throwError = throwError;
}
