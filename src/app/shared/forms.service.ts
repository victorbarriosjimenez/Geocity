import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FormsService {
    private countries_api: string = "https://geocity-app.firebaseio.com/countries.json";
    constructor(private _http: Http) { }
    public getCountries( ){ 
        return this._http.get(this.countries_api)
                   .map((response: Response) => response.json());
    } 
}       