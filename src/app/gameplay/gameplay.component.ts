import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GameplayService, Continent, continents, UserService } from './../shared';
import { Match, User } from '../../models';
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
  public continents =  continents;
  public isMatchConfigurationDone: boolean;
  public isLoadingLocationsFromContinentSelected: boolean = true;
  public latitudeOfContinentSelected: number = 0;
  public longitudeOfContinentSelected: number = 0;
  public index : number = 0 ;
  public user: User;
  public matchState: boolean = false; 
  public continent: Continent;
  public matchScoreControl: number = 0;
  public location:  Location;
  public marker: any = { };
  public subscription: any;
  constructor(private _gameplayService: GameplayService,
              private _afDatabase: AngularFireDatabase,
              private _userService: UserService) { 
    this.locations = [ ];
  }
  ngOnInit() { 
    this._userService.getUserData()
        .subscribe( user =>  this.user  = user);
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
                      this.beginMatch();
                      this.matchState = true;
                  });
  }
  mapClicked($event):  void {
    this.marker.lat = $event['coords'].lat;
    this.marker.lng = $event['coords'].lng; 
    let kilometers = this._gameplayService.returnDistanceBetweenLocationsSelected(this.location.lat, this.location.lng, $event['coords'].lat, $event['coords'].lng);
    this.matchScoreControl += this._gameplayService.setScoreFromCalculatedDistance(kilometers);
    this.subscription.unsubscribe();
    this.beginMatch();
 }
  beginMatch( ): void {
   if(this.index < 5) {
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
       this.beginMatch();
      }
    });
  }
  public prepareMatchToPost(): void {
      this.match  = {
          userId: this._userService.currentUserId,
          continent: this.continent.name,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          score: this.matchScoreControl,
          userScore: this.user.score
      }
      this._gameplayService.createNewMatch(this.match);
  }
  public canDeactivateRouteOfGame(){ 
    if(this.matchState == true){
      return window.confirm('Discard changes?');
    }
  }
}