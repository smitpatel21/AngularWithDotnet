import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { UserAuthService } from '../services/user-auth.service';
import { PageEvent } from '@angular/material/paginator';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  //books: any;
  userData: any;
  isLogged: boolean = false;
  missions: any;
  constructor(
    private crud: CrudService,
    private userAuth: UserAuthService,
    private mission: MissionService,
    private router: Router
  ) {}
  ngOnInit() {
    const user = localStorage.getItem('user');
    const userData = user && JSON.parse(user);
    if (userData.role === 'Admin') {
      this.router.navigate(['users']);
    }
    //this.getAllBooks();
    this.getAllMissions();
    this.userAuth.loginUserDetails.subscribe((result) => {
      this.userData = userData ? userData : result;
    });
    this.userAuth.isUserLoggedIn.subscribe(
      (result) =>
        (this.isLogged = localStorage.getItem('token') ? true : result)
    );
  }

  getAllMissions() {
    this.mission.getMissions().subscribe((result) => {
      this.missions = result;
    });
  }

  // getAllBooks() {
  //   const user = localStorage.getItem('user');
  //   if (user) {
  //     const userData = JSON.parse(user);
  //     if (userData.role === 'Admin') {
  //       this.crud.get().subscribe((result: any) => {
  //         this.crud.books.emit(result);
  //       });
  //     } else {
  //       let userId: string = '';
  //       userId = userData.id;
  //       this.crud.getBooksByUserId(userId).subscribe((result: any) => {
  //         this.crud.books.emit(result);
  //       });
  //     }
  //   }
  //   this.crud.books.subscribe((res) => {
  //     this.books = res;
  //   });
  // }

  // deleteBook(id: number) {
  //   this.crud.delete(id).subscribe((result) => {
  //     this.getAllBooks();
  //   });
  // }
}
