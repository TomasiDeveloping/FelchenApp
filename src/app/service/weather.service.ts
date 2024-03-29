import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Wetter} from '../models';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly wetter: Wetter;

  constructor(private httpClient: HttpClient) {
    // tslint:disable-next-line:new-parens
    this.wetter = new class implements Wetter {
      Sonnenaufgang: Date;
      Sonnenuntergang: Date;
      Bewoelkung: number;
      BeschreibungTitle: string;
      wetterId: number;
      IconURL: string;
      OrtsName: string;
      Beschreibung: string;
      Feuchtigkeit: number;
      Icon: string;
      Luftdruck: number;
      OrtName: string;
      Temperature: string;
      WetterDatum: Date;
      Windgeschwindigkeit: number;
      Windrichtung: string;
    };
  }

  getWeatherByZipCode(zip: number): Observable<Wetter> {
    let params = new HttpParams();
    params = params.append('zip', zip.toString() + ',ch');
    params = params.append('appid', environment.WEATHER_KEY);
    params = params.append('units', 'metric');
    params = params.append('lang', 'de');
    return this.httpClient.get<Wetter>(environment.WEATHER_URL, {params}).pipe(map(
        (res: any) => {
          console.log(res);
          sessionStorage.setItem('ort', res.name);
          this.wetter.wetterId = res.weather[0].id;
          this.wetter.IconURL = environment.WEATHER_ICON_URL + res.weather[0].icon + '@2x.png';
          this.wetter.OrtsName = res.name;
          this.wetter.Beschreibung = res.weather[0].description;
          this.wetter.Feuchtigkeit = res.main.humidity;
          this.wetter.Luftdruck = res.main.pressure;
          this.wetter.Temperature = res.main.temp;
          this.wetter.Windgeschwindigkeit = res.wind.speed;
          this.wetter.Windrichtung = this.getWindDeg(res.wind.deg);
          this.wetter.WetterDatum = new Date(res.dt * 1000);
          this.wetter.Sonnenaufgang = new Date(res.sys.sunrise * 1000);
          this.wetter.Sonnenuntergang = new Date(res.sys.sunset * 1000);
          this.wetter.BeschreibungTitle = this.getWeatherTitle(res.weather[0].id);
          this.wetter.Bewoelkung = res.clouds.all;
          return this.wetter;
        }
    ));
  }

  getWeatherByName(city: string): Observable<Wetter> {
    let params = new HttpParams();
    params = params.append('q', city);
    params = params.append('appid', environment.WEATHER_KEY);
    params = params.append('units', 'metric');
    params = params.append('lang', 'de');
    return this.httpClient.get<Wetter>(environment.WEATHER_URL, {params}).pipe(map(
        (res: any) => {
          console.log(res);
          this.wetter.wetterId = res.weather[0].id;
          sessionStorage.setItem('ort', res.name);
          this.wetter.IconURL = environment.WEATHER_ICON_URL + res.weather[0].icon + '@2x.png';
          this.wetter.OrtsName = res.name;
          this.wetter.Beschreibung = res.weather[0].description;
          this.wetter.Feuchtigkeit = res.main.humidity;
          this.wetter.Luftdruck = res.main.pressure;
          this.wetter.Temperature = res.main.temp;
          this.wetter.Windgeschwindigkeit = res.wind.speed;
          this.wetter.Windrichtung = this.getWindDeg(res.wind.deg);
          this.wetter.WetterDatum = new Date(res.dt * 1000);
          this.wetter.Sonnenaufgang = new Date(res.sys.sunrise * 1000);
          this.wetter.Sonnenuntergang = new Date(res.sys.sunset * 1000);
          this.wetter.BeschreibungTitle = this.getWeatherTitle(res.weather[0].id);
          this.wetter.Bewoelkung = res.clouds.all;
          return this.wetter;
        }
    ));
  }

  getWeather(longitude: number, latitude: number): Observable<Wetter> {
    let params = new HttpParams();
    params = params.append('lat', latitude.toString());
    params = params.append('lon', longitude.toString());
    params = params.append('appid', environment.WEATHER_KEY);
    params = params.append('units', 'metric');
    params = params.append('lang', 'de');
    return this.httpClient.get<Wetter>(environment.WEATHER_URL, {params}).pipe(map(
        (res: any) => {
          console.log(res);
          this.wetter.wetterId = res.weather[0].id;
          sessionStorage.setItem('ort', res.name);
          this.wetter.IconURL = environment.WEATHER_ICON_URL + res.weather[0].icon + '@2x.png';
          this.wetter.OrtsName = res.name;
          this.wetter.Beschreibung = res.weather[0].description;
          this.wetter.Feuchtigkeit = res.main.humidity;
          this.wetter.Luftdruck = res.main.pressure;
          this.wetter.Temperature = res.main.temp;
          this.wetter.Windgeschwindigkeit = res.wind.speed;
          this.wetter.Windrichtung = this.getWindDeg(res.wind.deg);
          this.wetter.WetterDatum = new Date(res.dt * 1000);
          this.wetter.Sonnenaufgang = new Date(res.sys.sunrise * 1000);
          this.wetter.Sonnenuntergang = new Date(res.sys.sunset * 1000);
          this.wetter.BeschreibungTitle = this.getWeatherTitle(res.weather[0].id);
          this.wetter.Bewoelkung = res.clouds.all;
          return this.wetter;
        }
    ));
  }

  getWindDeg(wind: number) {
    if (wind === 360) {
      return 'Norden';
    }
    if (wind === 90) {
      return 'Osten';
    }
    if (wind === 180) {
      return 'Süden';
    }
    if (wind === 270) {
      return 'Westen';
    }
    if (wind === 45) {
      return 'Nord-Ost';
    }
    if (wind === 135) {
      return 'Süd-Ost';
    }
    if (wind === 225) {
      return 'Süd-West';
    }
    if (wind === 315) {
      return 'Nord-West';
    }
    if (wind > 0 && wind < 45) {
      return 'Nord-Nord-Ost';
    }
    if (wind > 45 && wind < 90) {
      return 'Ost-Nord-Ost';
    }
    if (wind > 90 && wind < 135) {
      return 'Ost-Süd-Ost';
    }
    if (wind > 135 && wind < 180) {
      return 'Süd-Süd-Ost';
    }
    if (wind > 180 && wind < 225) {
      return 'Süd-Süd-West';
    }
    if (wind > 225 && wind < 270) {
      return 'West-Süd-West';
    }
    if (wind > 270 && wind < 315) {
      return 'West-Nord-West';
    }
    if (wind > 315 && wind < 360) {
      return 'Nord-Nord-West';
    }
    return 'Windstil';
  }

  getWeatherTitle(id: number) {
    switch (id) {
      case 200:
      case 201:
      case 202:
      case 210:
      case 211:
      case 212:
      case 221:
      case 230:
      case 231:
      case 232:
        return 'Gewitter';
      case 300:
      case 301:
      case 302:
      case 310:
      case 311:
      case 312:
      case 313:
      case 314:
      case 321:
        return 'Nieselregen';
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
      case 511:
      case 520:
      case 521:
      case 522:
      case 531:
        return 'Regnerisch';
      case 600:
      case 601:
      case 602:
      case 611:
      case 612:
      case 613:
      case 615:
      case 616:
      case 620:
      case 621:
      case 622:
        return 'Schnee';
      case 701:
        return 'Nebel';
      case 711:
        return 'Dunst';
      case 721:
        return 'Nebel';
      case 731:
        return 'Staubnebel';
      case 741:
        return 'Nebel';
      case 751:
        return 'Sand';
      case 761:
        return 'Staub';
      case 762:
        return 'Asche';
      case 771:
        return 'Sturmböe';
      case 781:
        return 'Tornado';
      case 800:
        return 'Klar';
      case 801:
      case 802:
      case 803:
      case 804:
        return 'Bewölkt';
      default:
        return '';
    }
  }
}
