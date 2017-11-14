import { Component, OnInit } from '@angular/core';
import { GameplayService, Continent, continents, UserService } from './../shared';
import { Match  } from '../../models';
import { MatSnackBar } from '@angular/material';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Location } from '../../models';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {  
  public match: Match = { };
  public locations: Location[]; 
  public secondsTimer: any;
  public beginMatch: boolean;
  public continents =  continents;
  public isMatchConfigurationDone: boolean;
  public isLoadingLocationsFromContinentSelected: boolean = true;
  public latitudeOfContinentSelected: number = 0;
  public longitudeOfContinentSelected: number = 0;
  public index : number = 0 ;
  public continent :  Continent;
  public matchScoreControl: number = 0;
  public userId: string = '';
  public location:  Location;
  public interval : any;
  constructor(private _gameplayService: GameplayService,
              private _afDatabase: AngularFireDatabase,
              private _userService: UserService,
              private _matSnackbar: MatSnackBar) { 
    this.beginMatch = null;
    this.locations = [ ];
  }
  ngOnInit() { 
    this.isMatchConfigurationDone = false;
  }
  private selectContinentForMatch(continent: Continent): void {
    this.continent = continent; 
    this.latitudeOfContinentSelected = continent.lat
    this.longitudeOfContinentSelected = continent.lng;
    this.continent.isContinentSelected = true;
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
    let meters = this._gameplayService.returnDistanceBetweenLocationsSelected(this.location.lat, this.location.lng, $event['coords'].lat, $event['coords'].lng);
  }
  gameTest( ){
    this.interval = setInterval(() => {
                      this.location = this.locations[this.index];
                      this.index += 1;
                      if(this.index === 5){
                          clearTimeout(this.interval);
                          this.prepareMatchToPost();
                      }
    },5000);
  }
  public prepareMatchToPost(): void {
      this.match  = {
          userId: this._userService.currentUserId,
          continent: 'Africa',
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          score: this.matchScoreControl
      }
  }
  private showsSnackBarWithDetails(result: number) : void {
    this._matSnackbar.open(`Distancia ${result}`, "DE ACUERDO", {
        duration: 3000,
    }); 
  }
}