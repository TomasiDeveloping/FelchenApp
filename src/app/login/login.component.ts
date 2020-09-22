import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../service/api.service';
import Swal from 'sweetalert2';
import {ModalController} from '@ionic/angular';
import {AddUserComponent} from '../add-user/add-user.component';
import {NgxSpinnerService} from 'ngx-spinner';
import * as sha256 from 'sha256';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    @Output() status = new EventEmitter<boolean>();
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private modalCtr: ModalController,
                private spinnerService: NgxSpinnerService,
                private apiService: ApiService) {
    }


    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

    async forgotPassword() {
        const modal = await this.modalCtr.create({
            component: ForgotPasswordComponent,
            cssClass: 'my-custom-class',
        });
        return await modal.present();
    }

    login() {
        this.spinnerService.show();
        const password = sha256(this.loginForm.value.password);
        this.apiService.login(this.loginForm.value.email, password).subscribe(
            (data) => {
                if (data) {
                    this.spinnerService.hide();
                    localStorage.setItem('id', data.id);
                    this.status.emit(true);
                } else {
                    this.status.emit(false);
                }
            }, (error) => {
                this.spinnerService.hide();
                Swal.fire('Login', error.error.error_description, 'error').then();
                this.loginForm.controls.password.reset();
                this.status.emit(false);
            }
        );
    }

    async register() {
        const modal = await this.modalCtr.create({
            component: AddUserComponent,
            cssClass: 'my-custom-class',
        });

        // modal.onDidDismiss()
        //     .then((data) => {
        //       if (data.data) {
        //         this.getData();
        //       }
        //     });

        return await modal.present();
    }
}
