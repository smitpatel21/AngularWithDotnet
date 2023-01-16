import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  allUsers: any;
  userId: any;
  constructor(
    private crud: CrudService,
    private activeRoute: ActivatedRoute,
    private userAuth: UserAuthService
  ) {}

  ngOnInit() {
    this.userId = this.activeRoute.snapshot.paramMap.get('id');
    this.getAllUsers();
  }

  getAllUsers() {
    this.userAuth.isLoading.emit(true);
    this.crud.getAllUsers().subscribe((result) => {
      this.crud.users.emit(result);
      this.userAuth.isLoading.emit(false);
    });
    this.crud.users.subscribe((result) => {
      this.allUsers = result;
    });
  }

  deleteUser(id: string) {
    this.userAuth.deleteUser(id).subscribe((result) => {
      this.getAllUsers();
    });
  }
}
