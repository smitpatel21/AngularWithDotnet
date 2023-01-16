import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  books = new EventEmitter();
  users = new EventEmitter();
  userSkills = new BehaviorSubject([]);
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get('http://localhost:5250/api/books');
  }

  getSingle(id: number) {
    return this.http.get(`http://localhost:5250/api/books/${id}`);
  }

  getBooksByUserId(id: string) {
    return this.http.get(`http://localhost:5250/api/books/user/${id}`);
  }

  getUserByUserId(id: string) {
    return this.http.get(`http://localhost:5250/api/users/${id}`);
  }

  getAllUsers() {
    return this.http.get('http://localhost:5250/api/users');
  }

  add(data: any) {
    return this.http.post('http://localhost:5250/api/books', data, {});
  }

  update(id: number, data: any) {
    return this.http.put(`http://localhost:5250/api/books/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:5250/api/books/${id}`);
  }

  uploadStoryImage(formData: FormData) {
    return this.http.post('http://localhost:5250/api/books/upload', formData);
  }

  uploadProfileImage(formData: FormData) {
    return this.http.post('http://localhost:5250/api/users/upload', formData);
  }

  uploadMissionImage(formData: FormData) {
    return this.http.post('http://localhost:5250/api/mission/upload', formData);
  }
}
