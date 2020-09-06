import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../models';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {EditUserComponent} from '../edit-user/edit-user.component';
import Swal from 'sweetalert2';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

    @Output() status = new EventEmitter<boolean>();
  currentUser: User;
  constructor(private userService: UserService,
              private modalCtr: ModalController,
              private router: Router) {}

  ngOnInit(): void {
    this.userService.getUserById(Number(localStorage.getItem('id'))).subscribe(
        (user) => {
          this.currentUser = user;
        }
    );
  }

    logOut() {
        localStorage.clear();
        this.router.navigateByUrl('/tabs').then();
        window.location.reload();
    }

    async editUser(user: User) {
        const modal = await this.modalCtr.create({
            component: EditUserComponent,
            cssClass: 'my-custom-class',
            componentProps: {user}
        });

        // modal.onDidDismiss()
        //     .then((data) => {
        //         if (data.data) {
        //             this.getData();
        //         }
        //     });

        return await modal.present();
    }

    deleteUser() {
        Swal.fire({
            title: 'Bist Du sicher ?',
            text: 'Möchtest Du dein Benutzerkonto löschen ?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Abbrechen',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Löschen'
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Benutzerkonto löschen',
                    text: 'Dein Konto und alle Fänge werden aus der Datenbank gelöscht !',
                    icon: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Abbrechen',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Jetzt löschen !'
                }).then((result1) => {
                    if (result1.value) {
                        this.userService.deleteUser(this.currentUser.UserID).subscribe(
                            (bool) => {
                                if (bool) {
                                    Swal.fire('Konto löschen',
                                        'Konto wurde erfolgreich gelöscht',
                                        'success').then(() => this.logOut());
                                }
                            }, (error: HttpErrorResponse) => {
                                Swal.fire('Konto löschen', 'Konto konnte nicht gelöscht werden', 'error').then();
                            }
                        );
                    }
                });
            }
        });
    }
}
