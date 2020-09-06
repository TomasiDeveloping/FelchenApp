import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {User} from '../models';
import {ModalController} from '@ionic/angular';
import Swal from 'sweetalert2';
import {HttpErrorResponse} from '@angular/common/http';

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
              private userService: UserService) { }

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
    this.userService.insertUser(this.newUser).subscribe(
        (user) => {
          Swal.fire(
              'Neuer Account',
              'Hallo ' + user.FirstName + ' dein Account wurde erstellt.',
              'success'
          ).then(() => this.cancel());
        }, (error: HttpErrorResponse) => {
          Swal.fire('Neuer Account', error.error, 'error').then();
        }
    );
  }
}
