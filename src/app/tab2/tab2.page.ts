import {Component, OnInit} from '@angular/core';
import {Wetter} from '../models';
import {WeatherService} from '../service/weather.service';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from 'sweetalert2';
import {Platform} from '@ionic/angular';
import {Geolocation, GeolocationOptions} from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  wetter: Wetter;
  isNight: boolean;
  longitude: number;
  latitude: number;
  options: GeolocationOptions;

  noWeather = true;
  city: string;
  plz: number;

  constructor(private weatherService: WeatherService,
              public geolocation: Geolocation,
              private platform: Platform,
              private spinnerService: NgxSpinnerService,
  ) {
  }


  ngOnInit(): void {
    this.options = {
      timeout: 10000,
      enableHighAccuracy: true,
      maximumAge: 1000,
    };
  }

  getData() {
    this.spinnerService.show();
    this.geolocation.getCurrentPosition(this.options).then(
        (data) => {
          this.latitude = data.coords.latitude;
          this.longitude = data.coords.longitude;
          this.noWeather = false;
          this.spinnerService.hide();
          this.getWeather();
        }
    ).catch(
        () => {
          this.spinnerService.hide();
          Swal.fire('GPS', 'GPS Daten konnten nicht geladen werden', 'error').then();
        }
    );
  }

  getWeather() {
    this.weatherService.getWeather(this.longitude, this.latitude).subscribe(
        (res) => {
          this.spinnerService.hide();
          this.wetter = res;
          this.noWeather = false;
          this.isNight = res.IconURL.includes('n@2x');
        }, error => {
          this.spinnerService.hide();
          Swal.fire('Wetterdaten', 'Daten konnten nicht geladen werden', 'error').then();
        }
    );
  }

  getByName() {
    this.spinnerService.show();
    this.weatherService.getWeatherByName(this.city).subscribe(
        (res) => {
          this.wetter = res;
          this.isNight = res.IconURL.includes('n@2x');
          this.noWeather = false;
          this.spinnerService.hide();
        }, error => {
          this.spinnerService.hide();
          console.log(error);
          Swal.fire('Wetterdaten', 'Kein Ort mit dem Namen ' + this.city + ' gefunden').then();
        }
    );
  }

  getByPlz() {
    if (this.plz.toString().length !== 4) {
      Swal.fire('PLZ', 'PLZ muss 4 Zahlen lang sein', 'info').then();
      return;
    }
    this.spinnerService.show();
    this.weatherService.getWeatherByZipCode(this.plz).subscribe(
        (res) => {
          this.wetter = res;
          this.isNight = res.IconURL.includes('n@2x');
          this.noWeather = false;
          this.spinnerService.hide();
        }, error => {
          this.spinnerService.hide();
          console.log(error);
          Swal.fire('Wetterdaten', 'Kein Ort mit der PLZ ' + this.plz.toString() + ' gefunden', 'error').then();
        }
    );
  }

  newLoad() {
    this.noWeather = true;
  }
}
