import { Component } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-story-dashboard',
  templateUrl: './story-dashboard.component.html',
  styleUrls: ['./story-dashboard.component.css'],
})
export class StoryDashboardComponent {
  stories: any;
  userName: string[] = [];
  /**
   *
   */
  constructor(private crud: CrudService) {}
  ngOnInit() {
    this.getAllStories();
  }

  getAllStories() {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === 'Admin') {
        this.crud.get().subscribe((result: any) => {
          this.crud.books.emit(result);
          result.forEach((element: any) => {
            this.crud
              .getUserByUserId(element.userId)
              .subscribe((userData: any) => {
                this.userName.push(userData.firstName);
              });
          });
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

  deleteStory(id: number) {
    this.crud.delete(id).subscribe((result) => {
      this.getAllStories()
    });
  }
}
