import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { result } from 'lodash';
import { AddSkillsComponent } from '../add-skills/add-skills.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { userSkills } from '../data-types';
import { CrudService } from '../services/crud.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
  userId: string = '';
  imagePath: string = '';
  profileImage: string = '';
  userName: string = '';
  userSkills: userSkills[] = [];
  skills: userSkills[] = [];
  constructor(
    private router: ActivatedRoute,
    private crud: CrudService,
    private userAuth: UserAuthService,
    public dialog: MatDialog
  ) {
    localStorage.removeItem('user');
    this.userAuth.loginUserDetails.subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
    });
    this.getUserDetails();
  }
  ngOnInit() {
    this.getUserDetails();
  }

  openResetPasswordMenu() {
    const dialogRef = this.dialog.open(ChangePasswordComponent);
    dialogRef.afterClosed().subscribe((result) => {});
  }

  openSkillMenu() {
    const dialogRef = this.dialog.open(AddSkillsComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.getAddedSkills();
    });
  }

  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    about: new FormControl('', [Validators.required]),
    linkedin: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  });

  getUserDetails() {
    const user = localStorage.getItem('user');
    if (user) {
      this.skills = JSON.parse(user).skills;
      this.profileImage = JSON.parse(user).profilePicUrl;
      this.userName = JSON.parse(user).firstName;
      this.imagePath = JSON.parse(user).profilePicUrl;
      this.userForm.setValue({
        firstName: JSON.parse(user).firstName,
        lastName: JSON.parse(user).lastName,
        email: JSON.parse(user).email,
        role: JSON.parse(user).role,
        about: JSON.parse(user).about,
        city: JSON.parse(user).city,
        country: JSON.parse(user).country,
        status: JSON.parse(user).status,
        linkedin: JSON.parse(user).linkedin,
      });
    }
  }

  get FirstName() {
    return this.userForm.get('firstName');
  }

  get LastName() {
    return this.userForm.get('lastName');
  }

  get Email() {
    return this.userForm.get('email');
  }

  get Role() {
    return this.userForm.get('role');
  }

  imageSelect(e: any) {
    const formData: FormData = new FormData();
    formData.append('image', e.target.files[0], e.target.files[0].name);
    this.crud.uploadProfileImage(formData).subscribe((result: any) => {
      this.imagePath = result.folder;
    });
  }

  getAddedSkills() {
    const user = localStorage.getItem('user');
    const userId = user && JSON.parse(user).id;
    let skills: string[] = [];
    let tempSkill: userSkills[] = [];
    this.crud.userSkills.subscribe((result) => {
      skills = result;
    });
    skills.forEach((el) => {
      tempSkill.push({ name: el, userId: userId });
    });
    this.userSkills = tempSkill;
    this.skills = tempSkill;
  }

  SaveProfile() {
    const user = localStorage.getItem('user');
    const userId = user && JSON.parse(user).id;
    this.getAddedSkills();
    this.userAuth.loginUserDetails.next({
      id: userId,
      skills: this.userSkills,
      ...this.userForm.value,
      profilePicUrl: this.imagePath,
    });
    this.userAuth
      .updateUser(userId, {
        ...this.userForm.value,
        skills: this.userSkills,
        profilePicUrl: this.imagePath,
      })
      .subscribe((result) => {});
  }
}
