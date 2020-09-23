import {Component, Input, OnInit} from '@angular/core';
import {Fang} from '../models';
import Swal from 'sweetalert2';
import {CatchService} from '../service/catch.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ModalController} from '@ionic/angular';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-fang-details',
  templateUrl: './fang-details.component.html',
  styleUrls: ['./fang-details.component.scss'],
})
export class FangDetailsComponent implements OnInit {

  @Input() fang: Fang;

  constructor(private catchService: CatchService,
              private spinnerService: NgxSpinnerService,
              private modalCtr: ModalController) {
  }

  ngOnInit() {
  }

  deleteCatch(fang: Fang) {
    Swal.fire({
      title: 'Wirklich löschen ?',
      text: 'Bist Du sicher das Du den Fang löschen möchtest ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Abbrechen',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ja bitte löschen'
    }).then((result) => {
      if (result.value) {
        this.spinnerService.show();
        this.catchService.deleteCatchById(fang.FangID).subscribe(
            (data) => {
              if (data) {
                this.spinnerService.hide();
                Swal.fire('Fang löschen', 'Fang wurde gelsöcht', 'success').then(() => {
                  this.modalCtr.dismiss(true).then();
                });
              } else {
                this.spinnerService.hide();
                Swal.fire('Fang löschen', 'Fang konnte nicht gelöscht werden', 'error').then();
              }
            }, (error: HttpErrorResponse) => {
              this.spinnerService.hide();
              Swal.fire('Fang löschen', error.error, 'error').then();
            }
        );
      }
    });
  }

  closeModal() {
    this.modalCtr.dismiss(false).then();
  }
}
