import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-fang',
  templateUrl: './add-fang.component.html',
  styleUrls: ['./add-fang.component.scss'],
})
export class AddFangComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

    cancel() {
        this.router.navigate(['tabs/tab1']).then();
    }
}
