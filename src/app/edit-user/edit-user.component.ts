import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {UserService} from '../service/user.service';
import Swal from 'sweetalert2';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import * as sha256 from 'sha256';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {

  @Input() user: User;
  currentUser: User;
  editPassword = false;
  userForm: FormGroup;
  changePasswordForm: FormGroup;
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private modalCtr: ModalController) {
  }

  ngOnInit() {
    this.currentUser = this.user;
    this.userForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required])
    });
  }

  cancel() {
    this.user = this.currentUser;
    this.modalCtr.dismiss().then();
  }

  save() {
    this.userService.updateUser(this.user.UserID, this.user).subscribe(
        (user) => {
          this.user = user;
          Swal.fire('Benutzerdaten', 'Daten wurden geändert', 'success').then(() => this.modalCtr.dismiss());
        }, (error: HttpErrorResponse) => {
          Swal.fire('Benutzerdaten', error.error, 'error').then();
        }
    );
  }

  changePassword() {
    const checkOldPassword = sha256(this.changePasswordForm.value.oldPassword);
    if (checkOldPassword !== this.user.Password) {
      Swal.fire('Altes Passwort', 'Altes Passwort ist nicht korrekt', 'error').then();
      return;
    }
    this.user.Password = sha256(this.changePasswordForm.value.newPassword);
    this.userService.updateUser(this.user.UserID, this.user).subscribe(
        (user) => {
          localStorage.clear();
          Swal.fire('Passwort ändern', 'Passwort wurde geändert', 'success').then(
              () => this.router.navigate(['tabs']).then(() => window.location.reload())
          );
        }, (error: HttpErrorResponse) => {
          Swal.fire('Passwort ändrn', error.error, 'error').then();
        }
    );
  }

  showEditPassword() {
    this.editPassword = !this.editPassword;
  }
}
