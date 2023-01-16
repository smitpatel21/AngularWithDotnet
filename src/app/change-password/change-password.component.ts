import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  constructor(public dialog: MatDialog, private userAuth: UserAuthService) {}
  forgotPasswordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  get currentPassword() {
    return this.forgotPasswordForm.get('currentPassword');
  }

  get newPassword() {
    return this.forgotPasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.forgotPasswordForm.get('confirmPassword');
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  changePassword() {
    const user = localStorage.getItem('user');
    if (user) {
      const userId = JSON.parse(user).id;
      this.userAuth
        .changePassword(userId, this.forgotPasswordForm.value)
        .subscribe((result) => {});
    }
    this.closeDialog();
  }
}
