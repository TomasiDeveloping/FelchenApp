import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Fang} from '../models';

@Component({
  selector: 'app-fang-details',
  templateUrl: './fang-details.component.html',
  styleUrls: ['./fang-details.component.scss'],
})
export class FangDetailsComponent implements OnInit {

  public fang: Fang;
  constructor(public route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.fang = JSON.parse(params.fang);
    });
  }

  ngOnInit() {}

    deleteCatch(fang: Fang) {
    alert('Fang löschen mit der Id: ' + fang.FangID);
    }
}
