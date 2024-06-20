import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = 'http://localhost:8086';

  constructor(private http:HttpClient) { }
  public getCustomers(): Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.baseUrl+'/customers');
  }

  public searchCustomers(keyword: string): Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.baseUrl+`/searchCustomers?keyword=${keyword}`);
  }

  public addCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.baseUrl+'/customers', customer);
  }

  public deleteCustomer(id: number){
    return this.http.delete(this.baseUrl+`/customers/${id}`);
  }
}
