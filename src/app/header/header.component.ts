import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLogged: boolean = false;
  userData: any;
  dateTime: any;

  constructor(
    private userAuth: UserAuthService,
    private crud: CrudService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dateTime = `Thursday, November 3, 2022, 10:06 AM`;
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const userData = user && JSON.parse(user);
    this.userAuth.loginUserDetails.subscribe((result) => {
      this.userData = userData ? userData : result;
    });

    this.userAuth.isUserLoggedIn.subscribe(
      (result) => (this.isLogged = token ? true : result)
    );
  }

  logout() {
    this.userAuth.logout().subscribe((result) => {
      this.userAuth.isUserLoggedIn.next(false);
      this.userAuth.loginUserDetails.next({});
      this.userAuth.isUserLoggedIn.subscribe(
        (result) => (this.isLogged = result)
      );
      this.userAuth.loginUserDetails.subscribe(
        (result) => (this.userData = result)
      );
      this.userData = {};
      this.crud.books.emit();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/signup']);
    });
  }

  profile() {
    const user = localStorage.getItem('user');
    if (user) {
      const id = JSON.parse(user).id;
      this.router.navigate([`profile/${id}`]);
    }
  }
}
