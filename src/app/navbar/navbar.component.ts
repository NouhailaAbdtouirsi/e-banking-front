import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthServiceService} from "../services/auth-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  username = this.authService.username;
  constructor(public authService: AuthServiceService,
              private router: Router) {
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
  }
}
