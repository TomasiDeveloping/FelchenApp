import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Fang} from '../models';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CatchService} from '../service/catch.service';
import Swal from 'sweetalert2';
import {HttpErrorResponse} from '@angular/common/http';
import {ModalController} from '@ionic/angular';
import {WeatherService} from '../service/weather.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-fang',
  templateUrl: './add-fang.component.html',
  styleUrls: ['./add-fang.component.scss'],
})
export class AddFangComponent implements OnInit {

  constructor(private router: Router,
              private modalCtr: ModalController,
              private catchService: CatchService,
              private weatherService: WeatherService,
              private spinnerService: NgxSpinnerService,
              private formBuilder: FormBuilder) {
    this.addCatchForm = this.formBuilder.group({
      nymphenName: ['', ''],
      nymphenFarbe: ['', ''],
      hackengroesse: ['', ''],
      koepfchen: ['', ''],
      gewaesserName: ['', ''],
      tiefeStandort: ['', ''],
      tiefeFischFang: ['', ''],
      wasserTemperatur: ['', ''],
      wetter: ['', ''],
      luftTemperatur: ['', ''],
      luftdruck: ['', ''],
      windgeschwindigkeit: ['', ''],
      allowPublic: ['', ''],
    });
  }

  public fang: Fang;
  public addCatchForm: FormGroup;
  liveData = false;
  city: string;
  plz: number;

  ngOnInit() {
    // tslint:disable-next-line:new-parens
    this.fang = new class implements Fang {
      AllowPublic = false;
      FangDatum = new Date();
      FangID: number;
      GewaesserName = '';
      Hackengroesse = null;
      Koepfchen = '';
      LuftTemperatur = null;
      Luftdruck = null;
      NymphenFarbe = '';
      NymphenName = '';
      TiefeFischFang = null;
      TiefeStandort = null;
      UserID: number;
      WasserTemperatur = null;
      Wetter = '';
      Windgeschwindigkeit = null;
    };
    this.fang.UserID = Number(localStorage.getItem('id'));
    if (sessionStorage.getItem('ort')) {
      Swal.fire({
        title: 'Live Daten',
        text: 'Möchtest Du Live Daten für den Ort ' + sessionStorage.getItem('ort') + ' laden ?',
        icon: 'info',
        showCancelButton: true,
        cancelButtonText: 'Nein, anderer Ort',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ja bitte laden'
      }).then((result) => {
        if (result.value) {
          this.getWeather(sessionStorage.getItem('ort'));
        }
      });
    }
  }

  cancel() {
    this.modalCtr.dismiss(false).then();
  }

  addCatch() {
    this.spinnerService.show();
    this.catchService.insertCatch(this.fang).subscribe(
        (fang) => {
          this.spinnerService.hide();
          Swal.fire({
            title: 'Fang hinzufügen',
            text: 'Fang wurde hinzugefügt',
            icon: 'success'
          }).then(() => this.modalCtr.dismiss(true).then());
        }, (error: HttpErrorResponse) => {
          this.spinnerService.hide();
          Swal.fire('Fang hinzufügen', error.error, 'error').then();
        }
    );
  }

  closeModal() {
    this.modalCtr.dismiss(false).then();
  }

  getWeather(city: string) {
    this.spinnerService.show();
    this.weatherService.getWeatherByName(city).subscribe(
        (res) => {
          this.fang.Wetter = res.Beschreibung;
          this.fang.Windgeschwindigkeit = res.Windgeschwindigkeit;
          this.fang.LuftTemperatur = Number(res.Temperature);
          this.fang.Luftdruck = res.Luftdruck;
          this.liveData = true;
          this.spinnerService.hide();
        }, error => {
          this.spinnerService.hide();
          console.log(error);
          Swal.fire('Live Daten', 'Wetterdaten konnten nicht geladen werden', 'error').then();
        }
    );
  }

  getByName() {
    this.spinnerService.show();
    this.weatherService.getWeatherByName(this.city).subscribe(
        (res) => {
          this.fang.Wetter = res.Beschreibung;
          this.fang.Windgeschwindigkeit = res.Windgeschwindigkeit;
          this.fang.LuftTemperatur = Number(res.Temperature);
          this.fang.Luftdruck = res.Luftdruck;
          this.liveData = true;
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
          this.fang.Wetter = res.Beschreibung;
          this.fang.Windgeschwindigkeit = res.Windgeschwindigkeit;
          this.fang.LuftTemperatur = Number(res.Temperature);
          this.fang.Luftdruck = res.Luftdruck;
          this.liveData = true;
          this.spinnerService.hide();
        }, error => {
          this.spinnerService.hide();
          console.log(error);
          Swal.fire('Wetterdaten', 'Kein Ort mit der PLZ ' + this.plz.toString() + ' gefunden', 'error').then();
        }
    );
  }
}
