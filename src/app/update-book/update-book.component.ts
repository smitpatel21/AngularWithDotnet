import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent {
  updateProductId: number = 0;
  constructor(private crud: CrudService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.updateProductId = Number(this.router.snapshot.paramMap.get('id'));
    this.getProduct(this.updateProductId);
  }

  bookForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    // imageUrl: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  get title() {
    return this.bookForm.get('title');
  }

  get price() {
    return this.bookForm.get('price');
  }

  // get image() {
  //   return this.bookForm.get('imageUrl');
  // }

  getProduct(id: number) {
    this.crud.getSingle(id).subscribe((result: any) => {
      this.bookForm.setValue({
        title: result.title,
        price: result.price,
        description: result.description,
      });
    });
  }

  updateBook() {
    const user = localStorage.getItem('user');
    if (user) {
      this.crud
        .update(this.updateProductId, {
          ...this.bookForm.value,
          UserId: JSON.parse(user).id,
        })
        .subscribe((result) => {
          this.bookForm.reset();
        });
    }
  }
}
