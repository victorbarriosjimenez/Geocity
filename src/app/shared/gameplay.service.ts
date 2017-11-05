import { Injectable } from '@angular/core'
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class GameplayService {
    public _locationsAPI: string = "https://geocity-app.firebaseio.com/locations";
    constructor(private _http: Http) { }
    public getMatchLocations(apiEndPoint: string) { 
      return this._http.get(`${this._locationsAPI}/${apiEndPoint}.json`)
                 .map(response => response.json()); 
    }
}