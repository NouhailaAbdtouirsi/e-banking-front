import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account, AccountDetails} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  public getAccount(accountID: string,page: number, size: number):Observable<AccountDetails> {
    return this.http.get<AccountDetails>(`http://localhost:8086/bank-accounts/${accountID}/account-history?page=${page}&size=${size}`);
  }
  public debit(accountID: string, amount: number, description: string) {
    return this.http.post<AccountDetails>(`http://localhost:8086/bank-accounts/debit`, {accountID : accountID,amount: amount, description: description});
  }
  public credit(accountID: string, amount: number, description: string) {
    return this.http.post<AccountDetails>(`http://localhost:8086/bank-accounts/credit`, {accountID : accountID,amount: amount, description: description});
  }
  public transfer(sourceAccountId: string, amount: number, description: string, targetAccountId: string) {
    return this.http.post<AccountDetails>(`http://localhost:8086/bank-accounts/transfer`, {sourceAccountId:sourceAccountId,amount:amount, description:description, targetAccountId:targetAccountId});
  }
  public accountByCustomer(customerID: number):Observable<Account[]> {
    return this.http.get<Account[]>(`http://localhost:8086/bank-accounts/customer/${customerID}`);
  }
}
