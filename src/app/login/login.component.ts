import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../services/user-auth.service';
import { login } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private userAuth: UserAuthService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.userAuth
      .login(this.loginForm.value as login)
      .subscribe((result: any) => {
        localStorage.setItem('token', `${result.token}`);
        localStorage.setItem('user', JSON.stringify(result.user));
        this.userAuth.isUserLoggedIn.next(true);
        this.userAuth.loginUserDetails.next(result.user);
        if (result.user.role ==='Customer')
          this.router.navigate(['/home']);
        else
          this.router.navigate(['/users'])
      });
    this.loginForm.reset();
  }
}
