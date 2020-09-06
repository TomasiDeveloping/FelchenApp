import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Fang} from '../models';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatchService {

  constructor(private httpClient: HttpClient) { }

  getCatchesByUserId(userId: number): Observable<Fang[]> {
    return this.httpClient.get<Fang[]>(environment.API_URL + '/User/' + userId + '/Fang');
  }
  insertCatch(fang: Fang): Observable<Fang> {
    return this.httpClient.post<Fang>(environment.API_URL + '/Fang/', fang);
  }
  deleteCatchById(fangId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(environment.API_URL + '/Fang/' + fangId);
  }
}
