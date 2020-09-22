import {Component, OnInit} from '@angular/core';
import {Fang} from '../models';
import {Router} from '@angular/router';
import {CatchService} from '../service/catch.service';
import {ModalController} from '@ionic/angular';
import {FangDetailsComponent} from '../fang-details/fang-details.component';
import {AddFangComponent} from '../add-fang/add-fang.component';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    fangs: Fang[];
    isLoading = false;
    currentUserId: number;
    connectionError = false;

    constructor(private router: Router,
                private modalController: ModalController,
                private catchService: CatchService) {
    }

    ngOnInit(): void {
        this.currentUserId = Number(localStorage.getItem('id'));
        this.getData();
    }

    getData() {
        this.isLoading = true;
        this.connectionError = false;
        this.catchService.getCatchesByUserId(this.currentUserId).subscribe(
            (data) => {
                this.fangs = data;
                this.isLoading = false;
            }, (error: HttpErrorResponse) => {
                Swal.fire('Daten laden', 'Daten konnten nicht geladen werden', 'error').then();
                this.isLoading = false;
                this.connectionError = true;
            }
        );
    }

    async openDetails(fang: Fang) {
        const modal = await this.modalController.create({
            component: FangDetailsComponent,
            cssClass: 'my-custom-class',
            componentProps: {fang}
        });

        modal.onDidDismiss()
            .then((data) => {
                if (data.data) {
                    this.getData();
                }
            });

        return await modal.present();

    }

    async addCatch() {
        const modal = await this.modalController.create({
            component: AddFangComponent
        });

        modal.onDidDismiss()
            .then((data) => {
                if (data.data) {
                    this.getData();
                }
            });

        return await modal.present();
    }

    refresh() {
        this.getData();
    }
}
