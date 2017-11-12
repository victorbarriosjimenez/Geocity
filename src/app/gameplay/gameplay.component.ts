import { Component, OnInit } from '@angular/core';
import { GameplayService, Continent, continents  } from './../shared';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Location } from '../../models';
import { Observable } from 'rxjs/Rx';
export interface coords {
    lat: number;
    lng: number;
}
@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {  
  public locations: Location[]; 
  public beginMatch: boolean;
  public continents =  continents;
  public isMatchConfigurationDone: boolean;
  public isLoadingLocationsFromContinentSelected: boolean = true;
  public latitudeOfContinentSelected: number = 0;
  public longitudeOfContinentSelected: number = 0;
  public index : number = 0 ;
  public score: number = 0 
  public location:  Location;
  public interval : any;
  constructor(private _gameplayService: GameplayService,
           private _afDatabase: AngularFireDatabase  
  ) { 
    this.beginMatch = null;
    this.locations = [ ];
  }
  ngOnInit() { 
    this.isMatchConfigurationDone = false;
  }
  private selectContinentForMatch(continent: Continent): void {
    this.latitudeOfContinentSelected = continent.lat;
    this.longitudeOfContinentSelected = continent.lng;
    continent.isContinentSelected = true;
    this._gameplayService.getMatchLocations(continent.apiEndpoint)
        .subscribe(locations => this.locations = locations,
                  (err) => console.log(err),
                  () => { 
                      this.isLoadingLocationsFromContinentSelected = false,
                      continent.isContinentSelected = false,
                      this.isMatchConfigurationDone = true,
                      this.gameTest()
                  });
  }
  mapClicked($event){
    if(this.index === 5){
      console.log("ya parale")
      clearTimeout(this.interval);
    }
    let meters = this._gameplayService.returnDistanceBetweenLocationsSelected(this.location.lat, this.location.lng, $event['coords'].lat, $event['coords'].lng);
  }
  gameTest( ){
    this.interval = setInterval(() => {
                      this.location = this.locations[this.index];
                      this.index += 1;
                      if(this.index === 5){
                        clearTimeout(this.interval);
                        
                      }
    },1000);
  }

}