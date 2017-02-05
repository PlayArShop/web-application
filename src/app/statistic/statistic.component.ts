import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { contentHeaders } from '../common/headers';
import { OnInit } from '@angular/core';

let styles = require('./statistic.style.css');
let template = require('./statistic.template.html');

@Component({
    selector: 'statistic',
    template: template,
    styles: [styles]
})

export class StatisticComponent {
    API_URL: string = 'http://api.playarshop.com';
    jwt: string;
    public response: any;
    public fev: string;

    //Line chart
    public lineChartData: Array<any>;

    public lineChartLabels: Array<any> = ['January', 'February', 'March',
                                            'April', 'May', 'June', 'July'];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    //Dognut chart
    public polarAreaChartLabels: string[];
    public polarAreaChartData: number[];
    public polarAreaLegend: boolean = true;

    public polarAreaChartType: string = 'polarArea';

    public RetainValue: number;


    constructor(private http: Http) {
        this.http.get(`${this.API_URL}/stats`, { headers: contentHeaders })
            .map((res: Response) => this.setResponse(res.text()))
            .subscribe(
            res => this.response = res
            );

        this.jwt = localStorage.getItem('jwt');
    }


    setResponse(toto: string) {
        var object;
        var layer;
        this.fev = toto;
        console.log('entire json:', toto);
        object = JSON.parse(this.fev);

        let ff: Array<any> = new Array();
        for (var key in object['linechart']) {
            ff.push(object['linechart'][key]);
        }

        this.lineChartData = [
            { data: ff, label: 'Bandit Manchot' },
        ];

        let ll: Array<any> = new Array();
        for (var key in object['donut']) {
            ll.push(object['donut'][key]);
        }
        this.polarAreaChartData = ll;

        let rr: Array<any> = new Array();
        for (var key in object['donut']) {
            rr.push(key);
        }
        this.polarAreaChartLabels = rr;
    }

    // events
    public chartClicked(e: any): void {
    }

    public chartHovered(e: any): void {
    }
}
