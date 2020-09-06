import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Fang} from '../models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CatchService} from '../service/catch.service';
import Swal from 'sweetalert2';
import {HttpErrorResponse} from '@angular/common/http';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-add-fang',
  templateUrl: './add-fang.component.html',
  styleUrls: ['./add-fang.component.scss'],
})
export class AddFangComponent implements OnInit {

  constructor(private router: Router,
              private modalCtr: ModalController,
              private catchService: CatchService,
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
  }

    cancel() {
    this.modalCtr.dismiss(false).then();
    }

  addCatch() {
    this.catchService.insertCatch(this.fang).subscribe(
        (fang) => {
          Swal.fire({
            title: 'Fang hinzufügen',
            text: 'Fang wurde hinzugefügt',
            icon: 'success'
          }).then(() => this.modalCtr.dismiss(true).then());
        }, (error: HttpErrorResponse) => {
          Swal.fire('Fang hinzufügen', error.error, 'error').then();
        }
    );
  }

  closeModal() {
    this.modalCtr.dismiss(false).then();
  }
}
