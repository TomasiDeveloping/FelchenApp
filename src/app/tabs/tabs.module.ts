import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './tabs-routing.module';

import {TabsPage} from './tabs.page';
import {LoginComponent} from '../login/login.component';
import {AddUserComponent} from '../add-user/add-user.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [TabsPage, LoginComponent, AddUserComponent]
})
export class TabsPageModule {
}
