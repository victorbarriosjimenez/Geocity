import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {
  public continentes = [
    { "name": "America del Norte", "apiEndpoint": "" },
    { "name": "America del Sur",   },
    { "name": "Africa" },
    { "name": "Asia" },
    { "name": "Europa" },
    { "name": "Oceanía", }
  ] 
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