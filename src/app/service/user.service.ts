import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ForgotPassword, User} from '../models';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(environment.API_URL + '/User/' + userId);
  }

  insertUser(user: User): Observable<User> {
    return this.httpClient.post<User>(environment.API_URL + '/User/', user);
  }

  updateUser(userId: number, user: User): Observable<User> {
    return this.httpClient.put<User>(environment.API_URL + '/User/' + userId, user);
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(environment.API_URL + '/User/' + userId);
  }

  createNewPassword(forgotPassword: ForgotPassword): Observable<boolean> {
    return this.httpClient.post<boolean>(environment.API_URL + '/User/ForgotPassword/', forgotPassword);
  }
}
