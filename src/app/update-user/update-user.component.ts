import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent {
  userId: any;
  constructor(
    private userAuth: UserAuthService,
    private router: ActivatedRoute,
    private crud: CrudService
  ) {}

  ngOnInit() {
    this.userId = this.router.snapshot.paramMap.get('id');
    this.getUserDetails();
  }

  getUserDetails() {
    this.crud.getUserByUserId(this.userId).subscribe((result: any) => {
      this.userForm.setValue({
        FirstName: result.firstName,
        LastName: result.lastName,
        Email: result.email,
        Role: result.role,
      });
    });
  }

  userForm = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required]),
    Role: new FormControl('', [Validators.required]),
  });

  get FirstName() {
    return this.userForm.get('FirstName');
  }

  get LastName() {
    return this.userForm.get('LastName');
  }

  get Email() {
    return this.userForm.get('Email');
  }

  get Role() {
    return this.userForm.get('Role');
  }

  updateUser() {
    this.userAuth
      .updateUser(this.userId, this.userForm.value)
      .subscribe((result) => {});
  }
}
