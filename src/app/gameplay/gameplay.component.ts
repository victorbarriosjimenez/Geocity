import { Component, OnInit } from '@angular/core';

export interface Continent { 
      name:  string;
      apiEndpoint: string;
      lat: number;
      lon: number;
}

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {
  public continents = [
    { "name": "America del Norte", "apiEndpoint": "" },
    { "name": "America del Sur", "apiEndpoint":""  },
    { "name": "Africa", "apiEndpoint":""  },
    { "name": "Asia", "apiEndpoint":""  },
    { "name": "Europa" ,"apiEndpoint":"" },
    { "name": "Oceanía","apiEndpoint":""  }
  ]; 
  public lat: number;
  public lng: number;
  constructor() { }
  ngOnInit() {
    this.getUserLocation();
  }
  private getUserLocation() {
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

}