import { Injectable } from '@angular/core'
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { coords } from '../gameplay/gameplay.component';
@Injectable()
export class GameplayService {
    public _locationsAPI: string = "https://geocity-app.firebaseio.com/locations";
    constructor(private _http: Http) { }
    public getMatchLocations(apiEndPoint: string) { 
      return this._http.get(`${this._locationsAPI}/${apiEndPoint}.json`)
                 .map(response => response.json()); 
    }
    public returnDistanceBetweenLocationsSelected(
                                    locationSetLatitude: number, 
                                    locationSetLongitude : number,
                                    LocationClickedLatitude: number,
                                    locationClickedLongitude: number): number {
        var R = 6378137; 
        var dLat = this.rad(LocationClickedLatitude - locationSetLatitude)
        var dLong = this.rad(locationClickedLongitude - locationSetLongitude)
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
             Math.cos(this.rad(locationSetLatitude)) * Math.cos(this.rad(LocationClickedLatitude)) *
          Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; 
    }
    private rad(x): number {
        return x * Math.PI / 180;
    }
    
}