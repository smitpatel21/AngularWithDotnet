import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-story-page',
  templateUrl: './story-page.component.html',
  styleUrls: ['./story-page.component.css'],
})
export class StoryPageComponent {
  storyDetail: any;
  userData: any;
  updateProductId: number = 0;
  constructor(private crud: CrudService, private router: ActivatedRoute) {}
  ngOnInit() {
    this.updateProductId = Number(this.router.snapshot.paramMap.get('id'));
    this.getStoryData(this.updateProductId);
  }

  getStoryData(id: number) {
    this.crud.getSingle(id).subscribe((result: any) => {
      this.storyDetail = result;
      this.crud.getUserByUserId(this.storyDetail.userId).subscribe((result) => {
        this.userData = result;
      });
    });
  }
}
