import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { contentHeaders } from '../common/headers';

const template = require('./map.template.html');

@Component({
  selector: 'map',
  styleUrls: ['./map.style.css'],
  template: template
})

export class MapComponent {
  // google maps zoom level
  zoom: number = 7;
  key: string = 'AIzaSyDPrJOMaQoJJVWrvSc3IQvJ21zfDRWIh4Y';

  // initial center position for the map
  lat: number = 47.3566;
  lng: number = 2.3522;
  spot: any[];
  API_URL: string = 'http://api.playarshop.com';


  constructor(public router: Router, public http: Http) {
    this.getSpots()
      .then((data) => {
        this.spot = data.company;
      })
  }

  getSpots() {
    let options = new RequestOptions({ headers: contentHeaders });
    return this.http.get(`${this.API_URL}/location `, options)
      .toPromise()
      .then(function (res) {
        console.log('RESPONSE: ', JSON.stringify(res, null, 2));
        return res.json();
      })
      .catch(function (err) {
        console.error('ERROR: ', JSON.stringify(err, null, 2));
      });
  }


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {

  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }




  markers: marker[] = [
    {
      name: 'EPITECH',
      description: 'test',
      location: 'EPITECH Paris',
      lat: 48.8566,
      lng: 2.3522,
      label: 'A',
      draggable: false
    },
    {
      name: 'EPITECH',
      description: 'Test',
      location: 'EPITECH Rennes',
      lat: 48.2173,
      lng: -1.80,
      label: 'B',
      draggable: false
    },
    {
      name: 'EPITECH',
      description: 'Test',
      location: 'EPITECH Lyon',
      lat: 45.7640,
      lng: 4.8357,
      label: 'C',
      draggable: false
    }
  ]
}
// just an interface for type safety.
interface marker {
  name: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
