import { Component, OnInit } from '@angular/core';
import { GameplayService, Continent, continents, UserService } from './../shared';
import { Match, User } from '../../models';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Location } from '../../models';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { take } from 'lodash';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {  
  public match: Match = { };
  public locations: any; 
  public timer = 0;
  public enableButtonToGoNext: boolean =  true;
  public enableButtonToGoPrevious: boolean = true;
  public continents = continents;
  public isMatchConfigurationDone: boolean;
  public isLoadingLocationsFromContinentSelected: boolean = true;
  public latitudeOfContinentSelected: number = 0;
  public longitudeOfContinentSelected: number = 0;
  public indexOfContinent: number = 0; 
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
              private _userService: UserService,
            private _matDialog: MatDialog) { 
    this.locations = [ ];
  }
  ngOnInit() { 
    this._userService.getUserData()
        .subscribe(actions =>    this.user = actions.payload.val());
    this.isMatchConfigurationDone = false;
    this.continent = continents[this.indexOfContinent];
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
  public mapClicked($event):  void {
    this.marker.lat = $event['coords'].lat;
    this.marker.lng = $event['coords'].lng; 
    let kilometers: number = this._gameplayService.returnDistanceBetweenLocationsSelected(this.location.lat, this.location.lng, $event['coords'].lat, $event['coords'].lng);
    let pointsGiven: number = this._gameplayService.setScoreFromCalculatedDistance(kilometers);
    this.matchScoreControl += pointsGiven
    this.openDialogWithResultsOfLocationSelected(this.location,kilometers,pointsGiven);
    this.subscription.unsubscribe();
  }
  public beginMatch( ): void {
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
       this.beginMatch();
      }
    });
  }
  public prepareMatchToPost(): void {
      this.match = {
          userId: this._userService.currentUserId,
          continent: this.continent.name,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          score: this.matchScoreControl,
          userScore: this.user.score
      }
      this._gameplayService.createNewMatch(this.match);
  }
  public openDialogWithResultsOfLocationSelected(location: Location, distanceFromMarkerSelected: number, points: number): void {
    let dialogRef = this._matDialog.open(DialogComponent, {
      width: '40vw',
      data: { 
        name: this.location.nombre,
        image: this.location.imagen,
        distance: distanceFromMarkerSelected,
        points: points
      }
    });
    dialogRef.afterClosed().subscribe(result => {
        this.beginMatch();
    });
  }
  private goToNextContinent(): void {
    if(this.indexOfContinent < continents.length - 1 ){
      this.enableButtonToGoNext = true
      this.enableButtonToGoPrevious = true; 
      this.continent = continents[this.indexOfContinent += 1 ];      
    }
    else {
      this.enableButtonToGoNext = false;
      return;      
    }
  }
  private goToPreviousContinent(): void {
    if(this.indexOfContinent > 0){
      this.enableButtonToGoPrevious = true;
      this.enableButtonToGoNext = true;
      this.continent = continents[this.indexOfContinent -= 1];      
    }
    else {
      this.enableButtonToGoPrevious = false;
      return;      
    }
  }
}