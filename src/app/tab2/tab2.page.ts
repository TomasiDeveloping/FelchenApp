import {Component, OnInit} from '@angular/core';
import {ApiService} from '../service/api.service';
import {Wetter} from '../models';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  wetter: Wetter;
  constructor(private apiService: ApiService) {}

  // http://openweathermap.org/img/wn/ 10d @2x.png
  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    // Zeihen
    const longitude = 8.083660;
    const latitude =  47.475900;
    this.apiService.getWeather(longitude, latitude).subscribe(
        (res) => {
          this.wetter = res;
          console.log(this.wetter);
          console.log(this.wetter.OrtsName);
        }
    );
  }
}
