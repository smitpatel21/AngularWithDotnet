import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.css'],
})
export class StoryCardComponent {
  userName: string = '';
  profilePic: string = '';
  @Input() cardData: any;
  /**
   *
   */
  constructor(private router: Router, private crud: CrudService) {}
  ngOnInit() {
    this.crud.getUserByUserId(this.cardData.userId).subscribe((result: any) => {
      this.profilePic = result.profilePicUrl;
      this.userName = result.firstName;
    });
  }
  redirect(id: number) {
    this.router.navigate([`story-detail/${id}`]);
  }
}
