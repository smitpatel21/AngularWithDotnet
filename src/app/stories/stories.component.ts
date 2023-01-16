import { Component } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
})
export class StoriesComponent {
  stories: any;
  userData: any;
  isLogged: boolean = false;

  constructor(private userAuth: UserAuthService, private crud: CrudService) {}
  ngOnInit() {
    const user = localStorage.getItem('user');
    const userData = user && JSON.parse(user);
    this.getAllStories();
    this.userAuth.loginUserDetails.subscribe((result) => {
      this.userData = userData ? userData : result;
    });
    this.userAuth.isUserLoggedIn.subscribe(
      (result) =>
        (this.isLogged = localStorage.getItem('token') ? true : result)
    );
  }

  getAllStories() {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === 'Admin') {
        this.crud.get().subscribe((result: any) => {
          this.crud.books.emit(result);
        });
      } else {
        let userId: string = '';
        userId = userData.id;
        this.crud.get().subscribe((result: any) => {
          this.crud.books.emit(result);
        });
      }
    }
    this.crud.books.subscribe((res) => {
      this.stories = res;
    });
  }

  deleteBook(id: number) {
    this.crud.delete(id).subscribe((result) => {
      this.getAllStories();
    });
  }
}
