import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  loggedUser = false;

  constructor() {
  }

  ngOnInit(): void {
    if (localStorage.getItem('id')) {
      this.loggedUser = true;
    }
  }

  getStatus($event: any) {
    this.loggedUser = $event;
  }
}
