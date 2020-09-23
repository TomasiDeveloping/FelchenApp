import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {User} from '../models';
import {ModalController} from '@ionic/angular';
import Swal from 'sweetalert2';
import {HttpErrorResponse} from '@angular/common/http';
import * as sha256 from 'sha256';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  newUserForm: FormGroup;
  newUser: User;

  constructor(private formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private spinnerService: NgxSpinnerService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.newUserForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    // tslint:disable-next-line:new-parens
    this.newUser = new class implements User {
      Email: string;
      FirstName: string;
      IsActive = true;
      LastName: string;
      Password: string;
      UserID: number;
    };
  }

  cancel() {
    this.modalCtrl.dismiss().then();
  }

  register() {
    this.spinnerService.show();
    this.newUser.Password = sha256(this.newUser.Password);
    this.userService.insertUser(this.newUser).subscribe(
        (user) => {
          this.spinnerService.hide();
          Swal.fire(
              'Neuer Account',
              'Hallo ' + user.FirstName + ' dein Account wurde erstellt.',
              'success'
          ).then(() => this.cancel());
        }, (error: HttpErrorResponse) => {
          this.spinnerService.hide();
          Swal.fire('Neuer Account', error.error, 'error').then();
        }
    );
  }
}
