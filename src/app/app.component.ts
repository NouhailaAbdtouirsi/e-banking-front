import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthServiceService} from "./services/auth-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ebanking-frontend';
  constructor(private authService: AuthServiceService,
              private router: Router) {
  }
  ngOnInit(): void {
    this.authService.loadToken();
  }


}
