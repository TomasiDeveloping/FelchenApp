import {Component, OnInit} from '@angular/core';
import {Fang} from '../models';
import {Router} from '@angular/router';
import {CatchService} from '../service/catch.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
    // fangs: Fang[] = [
    //     {
    //         FangID:  1,
    //         FangDatum: new Date('2015-03-25'),
    //         NymphenName: 'Red Devil',
    //         NymphenFarbe: 'Rot',
    //         Hackengroesse: 12,
    //         Koepfchen: 'Rund',
    //         GewaesserName: 'Zürichsee',
    //         TiefeStandort: 23,
    //         TiefeFischFang: 20,
    //         WasserTemperatur: 23,
    //         Wetter: 'Regen',
    //         Luftdruck: 1000,
    //         Windgeschwindigkeit: 5,
    //         LuftTemperatur: 35,
    //     },
    //     {
    //         FangID:  2,
    //         FangDatum: new Date('2016-05-20'),
    //         NymphenName: 'Silver',
    //         NymphenFarbe: 'Blau- Rot',
    //         Hackengroesse: 18,
    //         Koepfchen: 'Gold',
    //         GewaesserName: 'Hallwilersee',
    //         TiefeStandort: 18,
    //         TiefeFischFang: 18,
    //         WasserTemperatur: 20,
    //         Wetter: 'Schön',
    //         Luftdruck: 800,
    //         Windgeschwindigkeit: 10,
    //         LuftTemperatur: 28,
    //     },
    //     {
    //         FangID:  3,
    //         FangDatum: new Date('2020-08-30'),
    //         NymphenName: 'Sunrise',
    //         NymphenFarbe: 'Dunkel mit Blau',
    //         Hackengroesse: 16,
    //         Koepfchen: 'Gebunden',
    //         GewaesserName: 'Zürichsee',
    //         TiefeStandort: 28,
    //         TiefeFischFang: 25,
    //         WasserTemperatur: 18,
    //         Wetter: 'Bewölkt',
    //         Luftdruck: 870,
    //         Windgeschwindigkeit: 12,
    //         LuftTemperatur: 17.8,
    //     },
    // ];

    fangs: Fang[];
    constructor(private router: Router, private catchService: CatchService) {
    }

    openDetails(fang: Fang) {
        this.router.navigate(['tabs/tab1/details/', {fang: JSON.stringify(fang)}]).then();
    }

    addCatch() {
        this.router.navigate(['tabs/tab1/newCatch']).then();
    }

    ngOnInit(): void {
        this.catchService.getCatches().subscribe(
            (data) => {
                this.fangs = data;
            }
        );
    }
}
