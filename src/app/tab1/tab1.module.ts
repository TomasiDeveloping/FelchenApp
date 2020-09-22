import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';
import {FangDetailsComponent} from '../fang-details/fang-details.component';
import {AddFangComponent} from '../add-fang/add-fang.component';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';


import {Tab1PageRoutingModule} from './tab1-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        Tab1PageRoutingModule,
        ReactiveFormsModule,

    ],
    declarations: [Tab1Page, FangDetailsComponent, AddFangComponent, ForgotPasswordComponent]
})
export class Tab1PageModule {
}
