import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  imagePath: string = '';
  constructor(private crud: CrudService, private router: Router) {}

  bookForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    mission: new FormControl('', [Validators.required]),
  });

  get title() {
    return this.bookForm.get('title');
  }

  get date() {
    return this.bookForm.get('date');
  }

  imageSelect(e: any) {
    const formData: FormData = new FormData();
    formData.append('image', e.target.files[0], e.target.files[0].name);
    this.crud.uploadStoryImage(formData).subscribe((result: any) => {
      this.imagePath = result.folder;
    });
  }

  addBook() {
    const user = localStorage.getItem('user');
    if (user) {
      this.crud
        .add({
          ...this.bookForm.value,
          UserId: JSON.parse(user).id,
          coverPicUrl: this.imagePath,
        })
        .subscribe((result) => {
          if (result) {
            this.router.navigate(['/']);
          }
        });
      this.bookForm.reset();
    }
  }
}
