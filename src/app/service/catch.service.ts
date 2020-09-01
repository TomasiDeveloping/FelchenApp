import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Fang} from '../models';

@Injectable({
  providedIn: 'root'
})
export class CatchService {

  constructor(private httpClient: HttpClient) { }

  getCatches(): Observable<Fang[]> {
    return this.httpClient.get<Fang[]>('https://felchenapp.tomasi-developing.ch/api/catch');
  }
}
