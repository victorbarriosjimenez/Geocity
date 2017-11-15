import { Component, OnInit } from '@angular/core';
import { GameplayService, Continent, continents, UserService } from './../shared';
import { Match  } from '../../models';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Location } from '../../models';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { take } from 'lodash';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {  
  public match: Match = { };
  public locations: any; 
  public timer = 0;
  public beginMatch: boolean;
  public continents =  continents;
  public isMatchConfigurationDone: boolean;
  public isLoadingLocationsFromContinentSelected: boolean = true;
  public latitudeOfContinentSelected: number = 0;
  public longitudeOfContinentSelected: number = 0;
  public index : number = 0 ;
  public continent: Continent;
  public matchScoreControl: number = 0;
  public location:  Location;
  public marker: any = {};
  public subscription: any;
  constructor(private _gameplayService: GameplayService,
              private _afDatabase: AngularFireDatabase,
              private _userService: UserService) { 
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
        .subscribe(locations => {
                    this.locations = take(this._gameplayService.shuffleArray(locations),5)
                  },
                  (err) => console.log(err),
                  () => { 
                      this.isLoadingLocationsFromContinentSelected = false,
                      continent.isContinentSelected = false,
                      this.isMatchConfigurationDone = true,
                      this.gameTest();
                  });
  }
  mapClicked($event){
    this.marker.lat = $event['coords'].lat;
    this.marker.lng = $event['coords'].lng; 
    let kilometers = this._gameplayService.returnDistanceBetweenLocationsSelected(this.location.lat, this.location.lng, $event['coords'].lat, $event['coords'].lng);
    this.matchScoreControl += this._gameplayService.setScoreFromCalculatedDistance(kilometers);
    this.subscription.unsubscribe();
    this.gameTest();
 }
 gameTest( ): void {
   if(this.index === 5) {
       this.subscription.unsubscribe();
       this.prepareMatchToPost();
   }
   this.location = this.locations[this.index];
   this.index += 1; 
   let timer = Observable.timer(1000,1000);
   this.subscription = timer.subscribe(t=>{
     this.timer = t;
     if(t === 30){
       this.subscription.unsubscribe();
       this.gameTest();
      }
    });
  }
  public prepareMatchToPost(): void {
      this.match  = {
          userId: this._userService.currentUserId,
          continent: this.continent.name,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          score: this.matchScoreControl
      }
      this._gameplayService.createNewMatch(this.match);
  }
}