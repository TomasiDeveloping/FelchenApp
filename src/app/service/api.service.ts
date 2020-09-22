import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginUser} from '../models';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  login(email: string, password: string) {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('grant_type', 'password');
    urlSearchParams.set('username', email);
    urlSearchParams.set('password', password);
    const body = urlSearchParams.toString();

    return this.httpClient.post<LoginUser>(environment.API_URL + '/Login', body, {headers: reqHeader}).pipe(map(
        (res: LoginUser) => {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('id', res.id);
          return res;
        }
    ));
  }
}
