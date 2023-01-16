import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { login, signup } from '../data-types';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private http: HttpClient) {}
  loginUserDetails = new BehaviorSubject({});
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isLoading = new EventEmitter(false);
  login(data: login) {
    return this.http.post('http://localhost:5250/api/account/login', data);
  }

  signup(data: signup) {
    return this.http.post('http://localhost:5250/api/account/signup', data);
  }

  logout() {
    return this.http.get('http://localhost:5250/api/account/logout');
  }

  deleteUser(id: string) {
    return this.http.delete(`http://localhost:5250/api/users/${id}`);
  }

  updateUser(id: string, data: any) {
    return this.http.put(`http://localhost:5250/api/users/${id}`, data);
  }

  changePassword(id: string, data: any) {
    return this.http.post(
      `http://localhost:5250/api/account/change-password/${id}`,
      data
    );
  }
}
