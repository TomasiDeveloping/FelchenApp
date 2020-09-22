import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {UserService} from '../service/user.service';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from 'sweetalert2';
import {HttpErrorResponse} from '@angular/common/http';
import {ForgotPassword} from '../models';
import * as sha256 from 'sha256';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  forgotPassword: ForgotPassword;

  constructor(private modalCtrl: ModalController,
              private spinnerService: NgxSpinnerService,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  cancel() {
    this.modalCtrl.dismiss().then();
  }

  newPassword() {
    this.spinnerService.show();
    // tslint:disable-next-line:new-parens
    this.forgotPassword = new class implements ForgotPassword {
      ClearTextPassword: string;
      Email: string;
      HashPassword: string;
    };
    this.forgotPassword.Email = this.email;
    this.forgotPassword.ClearTextPassword = this.randomPassword();
    this.forgotPassword.HashPassword = sha256(this.forgotPassword.ClearTextPassword);
    this.userService.createNewPassword(this.forgotPassword).subscribe(
        (data) => {
          if (data) {
            this.spinnerService.hide();
            Swal.fire('Neues Passwort', 'Neuse Passwort wird per Email gesendet', 'success').then(
                () => {
                  this.cancel();
                }
            );
          } else {
            this.spinnerService.hide();
            Swal.fire('Neues Passwort', 'Es gab einen Fehler', 'error').then();
          }
        }, (error: HttpErrorResponse) => {
          this.spinnerService.hide();
          Swal.fire('Neues Passwort', error.error, 'error').then();
        }
    );
  }

  randomPassword(): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;\'[]\\=-)(*&^%$#@!';
    let text = '';
    for (let i = 0; i <= 8; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
