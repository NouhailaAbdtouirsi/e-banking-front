import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthServiceService} from "../services/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  formLogin! : FormGroup;
  constructor(private fb: FormBuilder,
              private authService: AuthServiceService,
              private router: Router) {
  }

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control('')
    });
  }

  login() {
    this.authService.login(this.formLogin.value.username, this.formLogin.value.password).subscribe({
      next: (data) => {
        this.authService.loaProfile(data);
        this.router.navigateByUrl('/admin');
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
