import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  is_Authenticated: boolean = false;
  role: any;
  username: any;
  accessToken!: string;

  constructor(private http:HttpClient,
              private router : Router) { }

  public login(username: string, password: string) {
    let params = new HttpParams().
    set('username', username).set('password', password);
    let options =
      {
        headers : new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }
    return this.http.post('http://localhost:8086/auth/login', params,options);
  }

  loaProfile(data: any) {
    this.is_Authenticated = true;
    this.accessToken = data['access_token'];
    let jwtDecoder:any = jwtDecode(this.accessToken);
    this.username = jwtDecoder.sub;
    this.role = jwtDecoder.scope;
    window.localStorage.setItem('access_token', this.accessToken);
  }

  logout() {
    this.is_Authenticated = false;
    this.accessToken = '';
    this.username = '';
    this.role = '';
    this.router.navigate(['/login']);
  }

  loadToken() {
    let token = window.localStorage.getItem('access_token');
    if (token) {
      this.loaProfile({'access_token': token});
      this.router.navigate(['/admin/customers']);
    } else {
      this.is_Authenticated = false;
      this.accessToken = '';
      this.username = '';
      this.role = '';
    }
  }
}
