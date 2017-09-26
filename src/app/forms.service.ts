import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FormsService {
    private countries_api: string = "https://restcountries.eu/rest/v2/all";
    constructor(private _http: Http) { }
    public getCountries( ){ 
        return this._http.get(this.countries_api)
                   .map((response: Response) => response.json());
    } 
}