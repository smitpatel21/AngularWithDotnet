import { Component } from '@angular/core';
import { UserAuthService } from './services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // loading = true;
  isLogged: boolean = false;
  userDetails: any;
  constructor(private userAuth: UserAuthService) {
    this.userAuth.loginUserDetails.subscribe((result) => {
      this.userDetails = result;
    });
    this.userAuth.isUserLoggedIn.subscribe((result) => {
      this.isLogged = result; 
    });
  }
  ngOnInit() {
    // this.userAuth.isLoading.subscribe((result) => (this.loading = result));
    const user = localStorage.getItem('user');
    if (user) {
      this.isLogged = true;
      this.userAuth.loginUserDetails.next(JSON.parse(user));
    }
  }
}
