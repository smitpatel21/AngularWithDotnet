import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { signup } from '../data-types';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private userAuth: UserAuthService) {}

  signupForm = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required]),
    Role: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
    ConfirmPassword: new FormControl('', [Validators.required]),
  });

  get FirstName() {
    return this.signupForm.get('FirstName');
  }
  get LastName() {
    return this.signupForm.get('Last');
  }

  get Email() {
    return this.signupForm.get('Email');
  }

  get Password() {
    return this.signupForm.get('Password');
  }

  signup() {
    this.userAuth
      .signup(this.signupForm.value as signup)
      .subscribe((result) => {
        if (result) this.signupForm.reset();
      });
  }
}
